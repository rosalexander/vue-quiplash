/*
Author: Alexander Ros
*/


const express = require('express'),
    http=require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    port=3000

var Redis = require('ioredis');
var redis_address = process.env.REDIS_ADDRESS || 'redis://127.0.0.1:6379';
var redis = new Redis(redis_address);


app.get('/', function (req, res) {
    res.send('Server running');
});

server.listen(port, () => console.log('Server running on port: ' + port));

/**
 * Get the username of the client
 * 
 * @param {string} user_id - The session ID of the client
 * @returns {Promise} Promise object represents the username
 */
function get_username(user_id) {
    return redis.hget('users', user_id);
}

/**
 * Get the list of members in a lobby
 * 
 * @param {string} pin 
 * @returns {Promise} Promise object represents the list of members
 */
function get_list_users_in_lobby(pin) {
    return redis.smembers(pin);
}

/**
 * Remove id mappings from redis hashes 'id_map' and 'id_to_lobby'
 * 
 * @param {string} socket_id - The ID of the client socket
 */
async function remove_socket_mapping(socket_id) {
    var session_id = await redis.hget('id_map', socket_id);
    var deleted = await redis.hdel('id_map', socket_id);    
    if (deleted == 1) {
        return redis.hdel('id_to_lobby', session_id)
        .then((resolved) => {
            if (resolved) {
                console.log("Mappings for " + session_id + " removed");
            };
        });
    };

}

io.on('connection', function(socket) {
    console.log("Socket ID: " + socket.id)

    /**
     * Removes a user
     * 
     * @emits 'list_users_in_lobby'
     */
    socket.on('disconnect', function() {

        console.log("Disconnecting " + socket.id)

        var get_id = redis.hget('id_map', socket.id);
        var get_lobby = get_id.then((user_id) => {
            return redis.hget('id_to_lobby', user_id)
        });
        var get_username = get_id.then((user_id) => {
            return redis.hget('users', user_id)
        });

        Promise.all([get_lobby, get_username])
        .then(([lobby, username]) => {
            console.log("Removing " + username + " from " + lobby);
            redis.srem(lobby, username).then(function() {
                redis.smembers(lobby).then(function(result) {
                    io.emit('list_users_in_lobby', {pin: lobby, members: result});
                }.bind(lobby));
            }.bind(lobby))
        }).then(() => {
            remove_socket_mapping(socket.id)
        });
    });

    /**
     * Emits 'list_users_in_lobby' when called. Unused
     * 
     * @emits 'list_users_in_lobby'
     */
    socket.on('ask_list_users_in_lobby', function(data) {
        get_list_users_in_lobby(data.pin)
        .then( function(result) {
            io.emit('list_users_in_lobby', {pin: data.pin, members: result});
        }.bind(data))
    });

    /** CHAT ROOM FUNCTION
     * Prints to the console the id of a joined user
     */
    socket.on('join', function(data){
        console.log(data._id + ' has joined');
    });

    /** CHAT ROOM FUNCTION
     * Retrieve stored messages on redis and sends to client
     * 
     * @emits 'message_history'
     */
    redis.lrange('messages', 0, -1).then(function(result) {
        return result.map(function(x) {
            return JSON.parse(x);
        })
    }).then(function(result) {
        io.emit('message_history', result.reverse());
    });
    
    /** CHAT ROOM FUNCTION
     * Gets message from client and sends to all clients and stores in redis cache
     * 
     * @param {string} data
     * @emits 'message'
     */
    socket.on('send_message', function(data) {
        io.emit('message', data)
        redis.lpush('messages', JSON.stringify(data));

    });

    /**
     * Maps a new client session id to a username in 'users' and a socket id to a session id in 'id_map'
     * 
     * @param {Object} data
     * @param {string} data.user_id - The session id of a client
     * @param {string} data.username - The chosen username of a client
     */
    socket.on('new_client_connection', function(data) {
        console.log('New connection: ' + data.user_id);
        redis.hset('users', data.user_id, data.username);
        redis.hset('id_map', socket.id, data.user_id)
    });

    /** 
     * Takes a session id and checks if it exists in 'users'. If so, the username of the session id is returned for the client to use.
     * 
     * @param {string} user_id - The session id of a client
     * @emits 'get_username'
     */
    socket.on('get_existing_client_connection', function(user_id) {
        console.log("Retrieving existing client connection for " + user_id)
        redis.hget('users', user_id)
            .then(function(result) {
                if (result != null) {
                    console.log("Existing user " + result);
                    io.emit('get_username', {user_id: user_id, username: result});
                }})
            .then(() => {
                redis.hset('id_map', socket.id, user_id);});
    });


    /**
     * Add username to a lobby, then maps session id to the lobby
     * 
     * @param {Object} data
     * @param {string} data.username
     * @param {string} data.pin
     * @param {string} data.user_id
     * @emits 'list_users_in_lobby'
     */
    socket.on('add_user_to_lobby', function(data) {
        console.log("Adding user " + data.username + " to lobby " + data.pin);
        redis.sadd(data.pin, data.username).then(() => {
            redis.smembers(data.pin).then(function(result) {
                io.emit('list_users_in_lobby', {pin: data.pin, members: result});
            }.bind(data.pin));
        }).then(() => {
            redis.hset('id_to_lobby', data.user_id, data.pin);
        })
    });

    /** DEPRECRATED FUNCTION
     * Removes user from a lobby.
     */
    socket.on('remove_user_from_lobby', function(data) {
        console.log("Removing user " + data.username + " from lobby " + data.pin);
        redis.srem(data.pin, data.username).then(() => {
            redis.smembers(data.pin).then(function(result) {
                io.emit('list_users_in_lobby', {pin: data.pin, members: result});
            }.bind(data.pin));
        }).then(() => {
            redis.hdel('id_to_lobby', data.user_id);
        })
        
    });

    /**
     * Gets a list of users in a lobby
     * 
     * @param {string} pin
     * @emits 'list_users_in_lobby'
     */
    socket.on('get_users_in_lobby', function(pin) {
        redis.smembers(pin).then(function(result) {
            io.emit('list_users_in_lobby', {pin: pin, members: result});
        }.bind(pin));
    });

    /** DEPRECATED
     * Set the oldest member of a lobby as the admin of the lobby
     * 
     * @param {Object} data
     * @param {string} data.pin
     * @param {string} data.user_id
     */
    socket.on('set_admin_in_lobby', function(data) {
        redis.hexists('admin', data.pin).then((admin_exist) => {
            if (admin_exist) {
                redis.hget('admin', data.pin).then((admin_id) => {
                    get_username(admin_id).then((admin_name) => {
                        redis.sismember(data.pin, admin_name).then((is_logged_in) => {
                            if (!is_logged_in) {
                                redis.hset('admin', data.pin, data.user_id);
                            }
                        });
                    })
                });
                
            } else {

                redis.sismember(data.pin, data.user_id).then((is_logged_in) => {
                    if (is_logged_in) {
                        redis.hset('admin', data.pin, data.user_id);
                    }
                })
            }
        }).then(() => {
            redis.hget('admin', data.pin).then((admin_id) => {
                io.emit('get_admin_in_lobby', {pin: data.pin, user_id: admin_id})
                console.log("Admin set to user ID " + admin_id)
            });
        });
        
    });

});