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
    job_title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    job_location: {
        type: String,
        required: true
    },
    employment_type: {
        type: String,
        required: true
    }
}, {timestamps: true});

const model = mongoose.model('Job', Job);

module.exports = model;