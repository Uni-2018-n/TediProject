const mongoose = require('mongoose');

const Message = mongoose.Schema({
    chatid: {
        type: String,
    },
    sender: {
        type: String
    },
    text: {
        type: String
    }
}, {timestamps: true});

const model = mongoose.model('Message', Message);

module.exports = model;