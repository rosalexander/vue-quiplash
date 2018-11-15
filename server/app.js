
const express = require('express'),
    http=require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    port=3000,
    game_sockets = {},
    controller_sockets = {};

var Redis = require('ioredis');
var redis_address = process.env.REDIS_ADDRESS || 'redis://127.0.0.1:6379';
var redis = new Redis(redis_address);
var redis_subscribers = {};
var channel_history_max = 10;

app.get('/', function (req, res) {
    res.send('Server running');
});

server.listen(port, () => console.log('Server running on port: ' + port));

io.on('connection', function(socket) {
    console.log(socket.id)

    var member = {
        socket: socket.id,
    };

    redis.hset('members', socket.id, JSON.stringify(member));

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
    });

    socket.on('get_existing_client_connection', function(user_id) {
        console.log("Retrieving existing client connection for " + user_id)
        redis.hget('users', user_id).then(function(result) {
            
            if (result != null) {
                console.log("Existing user " + result)
                io.emit('get_username', {user_id: user_id, username: result})
            }
        })
    });
});