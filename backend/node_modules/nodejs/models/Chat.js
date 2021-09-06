const mongoose = require('mongoose');

const Chat = mongoose.Schema({
    chaters: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'NewUser',
        required: true
    },
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'NewUser'
            },
            text: {
                type: String,
                required: true
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {timestamps: true});

const model = mongoose.model('chat', Chat);

module.exports = model;