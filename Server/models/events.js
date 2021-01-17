const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    date: String,
    time: String,
    cameraId: String,
    detections: [String],
    actionTaken: String,
    userId: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = { Event }