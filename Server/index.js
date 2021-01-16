// Boot up server
const express = require('express')
const app = express()

// Just to check if server is running
app.get('/', (req, res) => {
    res.send('oBopp server is running')
})

// Deploy
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})
