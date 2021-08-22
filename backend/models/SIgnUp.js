const mongoose = require('mongoose');

const NewUser = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    ProfilePic: {
        type: String,
        required: false
    },
    Connected_users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'NewUser'
    }
    // Add every file necessary later
}, {timestamps: true});

const model = mongoose.model('NewUser', NewUser);

module.exports = model;