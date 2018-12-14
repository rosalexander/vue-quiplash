/*
Author: Alexander Ros

REDIS Data Structures
Hash sets:
    'users'
    'id_map'
    'id_to_lobby'
    'admin'

Set:
    pin:
         (VARIABLE) - the pin of the lobby

List:
    'prompt_' + pin:
         (VARIABLE) - the pin of the lobby
    'response_' + pin:
        (VARIABLE) - the pin of the lobby
    'messages'


*/


const express = require('express'),
    http=require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    port=3000,
    fs = require('fs')

var Redis = require('ioredis');
var redis_address = process.env.REDIS_ADDRESS || 'redis://127.0.0.1:6379';
var redis = new Redis(redis_address);


app.get('/', function (req, res) {
    res.send('Server running');
});

var prompt_data = JSON.parse(fs.readFileSync(__dirname + '/prompts.json', 'utf8'));
redis.flushall();


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
 * @param {string} pin cd 
 * @returns {string[]} The list of members
 */
async function get_list_users_in_lobby(pin) {
    let result = await redis.smembers(pin);
    return result
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
};

async function get_prompt(pin, prompt_id) {
    let prompt = await redis.lindex('prompt_' + pin, prompt_id);
    return prompt;
};

function get_combinations_helper(arr, index, i, pair, k, ref) {
    if (k > arr.length) {
        return;
    }
    
    if (index == k) {
      ref.add(pair.slice())
      return;
    }
  
    else if (i >= arr.length) {
      return;
    }
  
    pair[index] = arr[i];
    get_combinations_helper(arr, index+1, i+1, pair, k, ref);
    get_combinations_helper(arr, index, i+1, pair, k, ref);
}
  
function get_combinations(arr, k) {
    var combinations = new Set()
    var test = 'hello'
    get_combinations_helper(arr, 0, 0, new Array(k).fill(0), k, combinations);
    return combinations
}

io.on('connection', function(socket) {
    console.log("Socket ID: " + socket.id)

    /**
     * Removes a user when socket disconnection is detected
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
            if (username && lobby) {
                console.log("Removing " + username + " from " + lobby);
                redis.srem(lobby, username).then(function() {
                    redis.smembers(lobby).then(function(result) {
                        io.emit('list_users_in_lobby', {pin: lobby, members: result});
                    }.bind(lobby));
                }.bind(lobby));
                if (username == "Admin") {
                    redis.hdel('admin', lobby);
                }
            }
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
        io.emit('list_users_in_lobby', {pin: data.pin, members: get_list_users_in_lobby(data.pin)});
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
        }).then(() => {
            if (data.username == "Admin") {
                redis.hset('admin', data.pin, data.user_id);
            }
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

    /**
     * Start game
     */

    socket.on('set_start_game', function(data) {
        console.log("Starting game")
        redis.del('prompts_' + data.pin)
        redis.del('response_' + data.pin)
        console.log('Deleted prompts_' + data.pin + ' and responses_' + data.pin)
        io.emit('get_start_game', {pin: data.pin});
    });

    socket.on('set_prompts', async function (pin) {
        let prompts = [];
        let prompt_ids = new Set();
        let prompts_users = [];
        let user_list = await get_list_users_in_lobby(pin);
        
        let temp_user_list = user_list.splice()
        if (user_list.length <= 7) {
            for (let i = 0; i < 4; i++) {
                prompts_users.push(user_list)
            }
        } else if ((user_list.length > 8) && ((user_list.length <= 20))) {
            while (temp_user_list.length) {
                let temp_combination = []
                for (let i = 0; i < 4; i++) {
                    if (temp_user_list.length) {
                        temp_combination.push(temp_user_list.pop())
                    }
                }
                prompts_users.push(temp_combination)
            }
        } else if ((user_list.length > 20) && ((user_list.length <= 30))) {
            //divide by 5
            while (temp_user_list.length) {
                let temp_combination= []
                for (let i = 0; i < 5; i++) {
                    if (temp_user_list.length) {
                        temp_combination.push(temp_user_list.pop())
                    }
                }
                prompts_users.push(temp_combination)
            }
        } else if ((user_list.length > 30) && ((user_list.length <= 48))) {
            //divide by 6
            while (temp_user_list.length) {
                let temp_combination = []
                for (let i = 0; i < 6; i++) {
                    if (temp_user_list.length) {
                        temp_combination.push(temp_user_list.pop())
                    }
                }
                prompts_users.push(temp_combination)
            }
        } else {
            //divide by 10
            while (temp_user_list.length) {
                let temp_combination = []
                for (let i = 0; i < 10; i++) {
                    if (temp_user_list.length) {
                        temp_combination.push(temp_user_list.pop())
                    }
                }
                prompts_users.push(temp_combination)
            }
        }
        let admin_index = user_list.indexOf("Admin");
        let user_prompt = [];
        if (admin_index > -1) {
            user_list.splice(admin_index, 1);
        }
        
        Math.floor(Math.random() * user_list.length)

        do {
            prompt_ids.add(Math.floor(Math.random() * prompt_data.length));
        } while (prompt_ids.size < prompts_users.length)

        prompt_ids.forEach((id) => {
            redis.lpush('prompts_' + pin, id)
            prompts.push(prompt_data[id]['prompt'])
        })

        let prompt_ids_array = [...prompt_ids]

        io.emit('get_prompts', {pin: pin, prompts: prompts, prompt_ids: prompt_ids_array, users_prompt: prompts_users})
    });

    socket.on('set_prompt', function(data) {
        let prompt = get_prompt(data.pin, parseInt(data.prompt_id))
        io.emit('get_prompt', {pin: data.pin, prompt: prompt, prompt_id: data.prompt_id})
    });

    /**
     * Set the prompts for players after the admin has initialized them
     * 
     * @param {Object} data
     * @param {string} data.pin
     * @param {string} data.user_id
     */
    socket.on('set_prompts_player', function(data) {
        let pin = data.pin;
        let user_id = data.user_id;
    });

    /**
     * Submit the answer
     * 
     * @params {Object} data
     * @param {string} data.prompt_id
     * @param {string} data.answer
     * @param {string} data.username
     * @param {string} data.user_id
     */
    socket.on('submit_answer', function(data) {
        // console.log(data)
        redis.zadd('response_' + data.pin, 1, JSON.stringify(data)).catch((err) => {console.log(err)})
    }),

    socket.on('set_responses', function(pin) {
        redis.zrange('response_' + pin, 0, -1).then(function(result) {
            return result.map(function(x) {
                return JSON.parse(x);
            })
        }).then(function(result) {
            io.emit('get_responses', result);
        }).catch((err) => {console.log(err)});
    }),

    socket.on('submit_vote', function(response) {
        redis.zincrby('response_' + response.pin, 1, JSON.stringify(response)).catch((err) => {console.log(err)});

    }),

    socket.on('set_scores', function(data) {
        
        let get_scores = new Promise((resolve, reject) => {
            let scores = [];
            let usernames = [];
            let max = 0;
            let winners = [];
            data.responses.forEach(async function(response, index, array) {
                try {
                    let score = await redis.zscore('response_' + data.pin, JSON.stringify(response));
                    score = score - 1
                    let username = response.username
                    scores.push(score);
                    usernames.push(username)

                    if (score >= max) {
                        if (score == max) {
                            winners.push(username)
                        } else {
                            winners = [username]
                            score = max
                        }
                    }

                } catch (err) {
                    console.log(err);
                }
                if (index === array.length - 1) resolve({scores: scores, winners: winners});
            });

        });

        get_scores.then((scores) => {
            socket.emit('get_scores', {pin: data.pin, scores: scores.scores, winners: scores.winners})
        }) 
    })


});