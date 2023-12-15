//  it is the node server which will handle the socket io connections
const io = require('socket.io')(8000, {
    cors: {
        origin: "*"
    }
});
const cors = require('cors')



//we made the instance for all the user who joined the chat
const users = {};

io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});