
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

function get_username(user_id) {
    return redis.hget('users', user_id);
}

function get_list_users_in_lobby(pin) {
    return redis.smembers(pin);
}

io.on('connection', function(socket) {
    console.log("Socket ID: " + socket.id)

    socket.on('disconnect', function() {
        console.log("Disconnecting " + socket.id)

        var get_id = redis.hget('id_map', socket.id);
        var get_lobby = get_id.then((user_id) => {
            return redis.hget('id_to_lobby', user_id)
        });
        var get_username = get_id.then((user_id) => {
            return redis.hget('users', user_id)
        });
        var get_users = get_lobby.then((lobby) => {
            return redis.smembers(lobby)
        });

        Promise.all([get_lobby, get_username])
        .then(([lobby, username]) => {
            console.log("Removing " + username + " from " + lobby);
            redis.srem(lobby, username).then(function() {
                redis.smembers(lobby).then(function(result) {
                    io.emit('list_users_in_lobby', {pin: lobby, members: result});
                }.bind(lobby));
            }.bind(lobby))
        })
    });

    socket.on('ask_list_users_in_lobby', function(data) {
        get_list_users_in_lobby(data.pin)
        .then( function(result) {
            io.emit('list_users_in_lobby', {pin: data.pin, members: result});
        }.bind(data))
    });

    socket.on('join', function(data){
        console.log(data._id + ' has joined');
    });

    redis.lrange('messages', 0, -1).then(function(result) {
        return result.map(function(x) {
            return JSON.parse(x);
        })
    }).then(function(result) {
        io.emit('message_history', result.reverse());
    });
    

    socket.on('send_message', function(data) {
        io.emit('message', data)
        redis.lpush('messages', JSON.stringify(data));

    });

    socket.on('new_client_connection', function(data) {
        console.log('New connection: ' + data.user_id);
        redis.hset('users', data.user_id, data.username);
        redis.hset('id_map', socket.id, data.user_id)
    });

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

    socket.on('get_users_in_lobby', function(pin) {
        redis.smembers(pin).then(function(result) {
            io.emit('list_users_in_lobby', {pin: pin, members: result});
        }.bind(pin));
    });

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