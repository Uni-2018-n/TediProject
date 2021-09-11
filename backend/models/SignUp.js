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
    professional_position: {
        type: String,
        required: false
    },
    Employment_institution: {
        type: String,
        required: false
    },
    Education: {
        string: {
            type: String,
            required: false
        },
        private: {
            type: Boolean,
            required: false
        },
        required: false
    },
    Skills: {
        private: {
            type: Boolean,
            required: false
        },
        skills: [{
            type: String
        }],
        required: false
    },
    Connected_users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'NewUser'
    },
    Pending_requests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'NewUser'
    },
    Liked_Posts: [
        {
          post: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Posts'
          }
        }
    ],
    Notifications: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NewUser'
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Posts'
        },
        type: {
            type: String
        }
    }]
    // Add every file necessary later
}, {timestamps: true});

const model = mongoose.model('NewUser', NewUser);

module.exports = model;