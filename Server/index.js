// Boot up server
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
const server = require('http').Server(app)
const path = require('path')

// Socket Communications
const io = require('socket.io')(server)

// DB and auth
const { mongoose } = require('./mongoose');
const { User } = require('./models/user')
const bcrypt = require('bcrypt');
const SALT = 10;
// spicy ML shit
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
var fs = require('fs')
const inkjet = require('inkjet');


/**
 * EXPRESS SERVER ENDPOINTS
 */

app.get('/', (req, res) => {
    // Just to check if server is running
    res.send('oBopp server is running')
})

app.post('/register', (req, res) => {
    // Register new user to the db
    if (mongoose.connection.readyState != 1) {
		console.log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return
    }
    if (req.body.email == null || req.body.password == null) {
        res.status(400).send('Bad Request')
        return
    }

    User.findOne({'email': req.body.email}, function(err, user) {
        if (err) {
            res.status(500).send('Internal server error')
            return
        }
        if (user != null) {
            res.status(401).send('Email already registered')
            return
        }

        bcrypt.hash(req.body.password, SALT, (err, hash) => {
            if (err) {
                res.status(500).send('Internal server error')
                return
            }
    
            const newUser = new User({
                email: req.body.email,
                password: hash
            })
            newUser.save().then((result) => {
                res.send({'id': result._id})
            }).catch((error) => {
                console.log(error)
                if (error) {
                    res.status(500).send('Internal server error')
                } else {
                    res.status(400).send('Bad Request')
                }
            })
        });
    })    
})

app.post('/login', (req, res) => {
    // Attempt login with provided credentialsm if successful return ID
    if (mongoose.connection.readyState != 1) {
		console.log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return
    }
    if (req.body.email == null || req.body.password == null) {
        res.status(400).send('Bad Request')
        return
    }

    User.findOne({'email': req.body.email}, function(err, user) {
        if (err) {
            res.status(500).send('Internal server error')
            return
        }
        else if (user == null) {
            res.status(401).send('User Does Not Exist')
            return
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, match) {
                if (match) {
                    res.send({'id': user._id})
                } else {
                    res.status(401).send('Wrong Password')
                }
            })
        }
    })    
})

app.get('/socket', (req, res) => {
    // Test endpoint because we were figuring out sockets
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/doml', async (req, res) => {
    perform_spicy_ml_shit()
    .then((predictions) => {
        for (i = 0; i < predictions.length; ++i) {
            // console.log(predictions[i]);
            if (predictions[i].class === 'person') {
                res.send('holy fuck someones in your house');
                return;
                // res.send(JSON.stringify(predictions));
            }
        }
        res.send('all clear');
    })
    .catch((err) => {
        res.send('noml :(');
    });
})

/**
 * SOCKET BEHAVIOR
 */
io.on('connection', (socket) => {
    console.log("New connection from: " + socket.client.id)
    
    socket.on('webcam', (data) => {
        console.log(data)
    })
})

// Deploy
const port = process.env.PORT || 5000
server.listen(port, () => {
	console.log(`Listening on port ${port}...`)
})



/**
 * HOME OF SPICY ML SHIT
 */

function perform_spicy_ml_shit() {
    return new Promise(function(resolve, reject) {
        fs.readFile('testimages/test.jpg', async function(err, data) {
            if (err) {
                console.log('Made an oops loading photo :(');
                reject('Failed to read image');
            }
            if (data) {
                inkjet.decode(data, async (err, decoded) => {
                    if (err) reject('failed to decode image');
                    const model = await cocoSsd.load();
                    const predictions = await model.detect(decoded);
                    console.log('Predictions: ');
                    console.log(predictions);   
                    resolve(predictions);
                });
            }
        });
    });
 }
