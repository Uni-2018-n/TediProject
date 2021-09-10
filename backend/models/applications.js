const mongoose = require('mongoose');

const Application = mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewUser',
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    Description: {
        type: String,
        required: true
    },
    Bio_file: {
        type: String,
    },
    Skills: [{
        type: String,
        required: true
    }]
}, {timestamps: true});

const model = mongoose.model('Application', Application);

module.exports = model;