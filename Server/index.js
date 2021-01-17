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
const { Event } = require('./models/events')
const bcrypt = require('bcrypt');
const SALT = 10;
// spicy ML shit
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
var fs = require('fs')
const inkjet = require('inkjet');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// texting for intruders
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_client = require('twilio')(accountSid, authToken);
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

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
                phone: "+" + req.body.phone,
                cams: [],
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

app.get('/contactInfo/:userid', (req, res) => {
    // Get contact info of a user (phone, email)
    if (mongoose.connection.readyState != 1) {
        console.log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
		return
    }

    const id = req.params.userid
    User.findById(id).then((user) => {
        res.send({
            'email': user.email,
            'phone': user.phone
        })
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

app.get('/events/:userid', (req, res) => {
    if (mongoose.connection.readyState != 1) {
        console.log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
		return
    }
    console.log(req.params.userid);
    Event.find({'userId': req.params.userid}, function (err, events) {
        if (err) {
            res.status(500).send('Internal Server error');
            return;
        }
        res.send({
            'events': events
        });
    })
})


/**
 * SOCKET BEHAVIOR
 */
let counters = new Map();
let FIVE_MINUTES = 5*60*1000;
let alert_last_triggered = new Date() - (FIVE_MINUTES * 2);
let wait = false;
io.on('connection', (socket) => {
    console.log("New connection from: " + socket.client.id)
    var user

    socket.on('connectUser', (userID) => {
        addCamToUser(userID, socket.client.id)
        user = userID
        counters[socket.client.id] = 0

        socket.on('webcam', (data) => {
            imageCache.set(socket.client.id, data)
            if (new Date() - alert_last_triggered > FIVE_MINUTES && data && !wait) {
                if (counters[socket.client.id] >= 10) {
                    console.log('analyzing image');
                    check_frame(data, user, socket.client.id);
                    counters[socket.client.id] = 0;
                } else {
                    counters[socket.client.id] += 1
                }
            }
        })
    })

    socket.on('requestFootage', (camID) => {
        setInterval(() => {
            socket.emit('footage', imageCache.get(camID))
        }, 100)
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

function getUserInfo(userId) {
    return new Promise((resolve, reject) => {
        // Get contact info of a user (phone, email)
        if (mongoose.connection.readyState != 1) {
            console.log('Issue with mongoose connection')
            reject('failed to connect to mongoose');
        }
        User.findById(userId).then((user) => {
            resolve({
                'email': user.email,
                'phone': user.phone
            })
        })
    });
}

async function check_frame(data, userId, cameraId) {
    wait = true;
    getUserInfo(userId)
        .then((info) => {
            perform_spicy_ml_shit(data)
            .then((d) => {
                let predictions = d.predictions;
                if (predictions.length > 0) {
                    let now = new Date();
                    let newEvent = new Event({
                        date: now.toDateString(),
                        time: now.toTimeString().slice(0, 9),
                        actionTaken: 'None',
                        cameraId: cameraId,
                        userId: userId
                    });
                    for (i = 0; i < predictions.length; ++i) {
                        newEvent.detections.push(predictions[i].class);
                        // console.log(predictions[i]);
                        if (predictions[i].class === 'person') {
                            response = {
                                'person_detected': true,
                                'img': d.img
                            }
                            newEvent.actionTaken = 'Alert';
                            // send_intruder_photo(d.img, info.phone);
                            send_intruder_email(d.img, info.email);
                            alert_last_triggered = new Date();
                        }
                    }
                    newEvent.save();
                }
                wait = false;
            })
            .catch((err) => {
                console.log('noml :(: ' + err);
            });
    });
}

function perform_spicy_ml_shit(data) {
    return new Promise(function(resolve, reject) {
        if (data) {
            let shit = data.split(',')[1];
            inkjet.decode(Buffer.from(shit, 'base64'), async (err, decoded) => {
                if (err){
                    reject('failed to decode image: ' + err);
                } else {
                    model_promise.then(async (model) => {
                        const predictions = await model.detect(decoded);
                        console.log('Predictions: ');
                        console.log(predictions);   
                        resolve({
                            'predictions': predictions,
                            'img': shit,
                        });
                    })
                }
            });
        }
    });
 }

 async function uploadImage(image) {
     return new Promise((resolve, reject) => {
        let bucket = storage.bucket('hed2021');
        let file = bucket.file('intruder.jpg');
        file.save(Buffer.from(image, 'base64'), {
            metadata: { ContentType: 'image/jpeg' },
            public: true, 
        }).then(() => resolve())
        .catch((err) => reject(err));
    });
 }

 async function send_intruder_photo(image, user_phone) {
    if (image) {
        uploadImage(image).then(() => {
            twilio_client.messages
            .create({
                from: '+14088247333',
                body: 'This mans was detected in your house',
                mediaUrl: 'https://storage.googleapis.com/hed2021/intruder.jpg',
                to: user_phone
            })
            .then(message => console.log('Message sent: ' + message.sid))
            .catch(err => console.log('text failed: ' + err));
        })
        .catch((err) => console.log(err));
    }
 }

 function send_intruder_email(image, email) {
    const msg = {
        to: email,
        from: 'bgrenier@ualberta.ca',
        subject: 'Intruder Detected',
        text: 'This mans was detected in your house my guy',
        attachments: [
            {
                content: image,
                filename: 'intruder.jpg',
                type: 'image/jpeg',
            }
        ]
     }
     sgMail.send(msg)
        .then(() => console.log('Email sent'))
        .catch((err) => console.log('Email failed: ' + err));
 }


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
                send_intruder_photo(data.img, '+14038772383');
                // send_intruder_email(data.img, 'grenierb96@gmail.com');
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
        res.send('noml :(: ' + err);
    });
})
