const mongoose = require('mongoose');

const Posts = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewUser',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    pictures: [
      {
          type: String,
          required: false
      }
    ],
    videos: [
      {
        type: String,
        required: false
      }
    ],
    voice_recordings: [
      {
        type: String,
        required: false
      }
    ],
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [
        {
          user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'NewUser'
          }
        }
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'NewUser'
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        avatar: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
}, {timestamps: true});

const model = mongoose.model('Posts', Posts);

module.exports = model;