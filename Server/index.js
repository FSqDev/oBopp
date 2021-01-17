// Boot up server
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors');
app.use(cors())
const server = require('http').Server(app)
const path = require('path')
// Socket Communications
const io = require('socket.io')(server)
// DB and auth
const { ObjectID } = require('mongodb')
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

const model_promise = (async function() {
    m = await cocoSsd.load();
    return m;
})();

// Image cache
let imageCache = new Map()


/**
 * EXPRESS SERVER ENDPOINTS
 */
app.get('/', (req, res) => {
    // Just to check if server is running
    res.send('oBopp server is running')
})

app.post('/register', (req, res) => {
    // Register new user to the db
    console.log(req.body)

    if (mongoose.connection.readyState != 1) {
		console.log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return
    }
    if (req.body.email == null || req.body.password == null) {
        res.status(400).send('Bad Request')
        return
    }

    // Check if email registered
    User.findOne({'email': req.body.email}, function(err, user) {
        if (err) {
            res.status(500).send('Internal server error')
            return
        }
        if (user != null) {
            res.status(401).send('Email already registered')
            return
        }

        // Hash and add to DB
        bcrypt.hash(req.body.password, SALT, (err, hash) => {
            if (err) {
                res.status(500).send('Internal server error')
                return
            }
    
            const newUser = new User({
                email: req.body.email,
                password: hash,
                cams: []
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

app.get('/camlist/:userid', (req, res) => {
    // Get a list of a user's camera socket IDs
    if (mongoose.connection.readyState != 1) {
		console.log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return
    }

    const id = req.params.userid
    User.findById(id).then((user) => {
        res.send({'cams': user.cams})
	}).catch((error) => {
		log(error)
		res.status(500).send('Internal Server Error')
	})
})

app.get('/camera', (req, res) => {
    // Test endpoint which mimics the behavior of a camera
    res.sendFile(path.join(__dirname + '/test_html/test_cam.html'))
})

app.get('/manager', (req, res) => {
    // Test endpoint which mimics the behavior of a management interface
    res.sendFile(path.join(__dirname + '/test_html/test_manager.html'))
})

app.get('/doml', async (req, res) => {
    perform_spicy_ml_shit()
    .then((data) => {
        let predictions = data.predictions;
        for (i = 0; i < predictions.length; ++i) {
            // console.log(predictions[i]);
            if (predictions[i].class === 'person') {
                response = {
                    'person_detected': true,
                    'img': data.img
                }
                res.send(response);
                return;
                // res.send(JSON.stringify(predictions));
            }
        }
        res.send({
            'person_detected': false
        });
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
    var user

    socket.on('connectUser', (userID) => {
        addCamToUser(userID, socket.client.id)
        user = userID

        socket.on('webcam', (data) => {
            imageCache.set(socket.client.id, data)
            console.log(imageCache)
        })
    })

    socket.on('requestFootage', (camID) => {
        setInterval(() => {
            socket.emit('footage', imageCache.get(camID))
        }, 500)
    })

    socket.on('disconnect', (reason) => {
        if (user) {
            rmCamFromUser(user, socket.client.id)
        }
        console.log("Connection " + socket.client.id + " closed, reason: " + reason)
    })
})

function addCamToUser(userID, socketID) {
    if (mongoose.connection.readyState != 1) {
		console.log('Issue with mongoose connection')
		return
    }
    User.updateOne({_id: userID}, { $push: { cams: socketID } }, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    })
}

function rmCamFromUser(userID, socketID) {
    if (mongoose.connection.readyState != 1) {
		console.log('Issue with mongoose connection')
		return
    }
    User.updateOne({_id: userID}, { $pull: { cams: socketID } }, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    })
}


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

                    model_promise.then(async (model) => {
                        const predictions = await model.detect(decoded);
                        console.log('Predictions: ');
                        console.log(predictions);   
                        resolve({
                            'predictions': predictions,
                            'img': data.toString('base64'),
                        });
                    })
                    
                });
            }
        });
    });
 }
