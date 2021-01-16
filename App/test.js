const io = require('socket.io-client')
const socket = io("ADDRESS")

socket.on('socketClientID', function (socketClientID) {
    console.log('Connection to server established. SocketID is',socketClientID);
    socket.emit('test', 'test_message')
})
