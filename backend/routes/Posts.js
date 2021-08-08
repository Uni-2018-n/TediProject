const express  = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const upload   = require('../middleware/upload.js');
const Posts    = require('../models/Posts.js');
// const NewUser  = require('../models/Signup.js');

const router = express.Router();


// @desc Create a new post
router.post('/', (req, res) => {
    // Dont forget to check if post is valid (check library validator)

    const Post = new Posts({
        author: req.body.author.id,
        text: req.body.text,
        picture: req.body.picture,
        video: req.body.video,
        voice_recording: req.body.voice_recording,
        name: req.body.name,
        avatar: req.body.avatar
    });

    Post.save()
    .then(
        post => res.json(post)
    )
    .catch((err) => {
        res.json(err);
    });
})

// @desc Get all the Posts of a User
router.get('/:id', (req, res) => {
    Posts.find({author: req.params.id})
    .then(result => res.json(result))
    .catch(err => res.status(404).json({nopostfound: 'This User has no posts'}));
})

// @desc Delete Users Post
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Posts.findOneAndDelete({author: req.params.id});

        if (!deleted) return res.sendStatus(404);
        return res.send(deleted);
    } catch (error) {
        return res.sendStatus(404);
    }
})

module.exports = router;