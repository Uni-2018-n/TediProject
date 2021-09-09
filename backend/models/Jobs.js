const mongoose = require('mongoose');

const Job = mongoose.Schema({
    author: {
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
    Skills: [{
        type: String,
        required: true
    }]
}, {timestamps: true});

const model = mongoose.model('Job', Job);

module.exports = model;