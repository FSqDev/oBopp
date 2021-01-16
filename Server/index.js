// Boot up server
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

/**
 * EXPRESS SERVER ENDPOINTS
 */

app.get('/', (req, res) => {
    // Just to check if server is running
    res.send('oBopp server is running')
})

/**
 * SOCKET BEHAVIOR
 */
io.on('connection', (socket) => {
    console.log("New connection from: " + socket.client.id)
    io.emit('socketClientID', socket.client.id);

    
})

// Deploy
const port = process.env.PORT || 5000
server.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})
