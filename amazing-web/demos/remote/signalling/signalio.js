var io = require('socket.io').listen(1337);

io.sockets.on('connection', function (socket) {
    console.log('got connection');
    socket.on('message', function (data) {
        console.log(data);
        socket.broadcast.emit('message', data);
    });
});
