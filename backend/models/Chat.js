const mongoose = require('mongoose');

const Chat = mongoose.Schema({
    chaters: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'NewUser',
        required: true
    },
}, {timestamps: true});

const model = mongoose.model('chat', Chat);

module.exports = model;