const express  = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const upload   = require('../middleware/upload.js');
const Posts    = require('../models/Posts.js');
// const NewUser  = require('../models/Signup.js');

const router = express.Router();

//all routes are starting with /posts

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

// @dec Delete all Users Post
router.delete('/all/:Author_id', async (req, res) => {
    try {
        const deleted = await Posts.deleteMany({author: req.params.Author_id});

        if (!deleted) return res.sendStatus(404);
        return res.send(deleted);
    } catch (error) {
        return res.sendStatus(404);
    }
})

// @desc Delete one User Post
router.delete('/:Post_id', async (req, res) => {
    try {
        const deleted = await Posts.findOneAndDelete({_id: req.params.Post_id});

        if (!deleted) return res.sendStatus(404);
        return res.send(deleted);
    } catch (error) {
        return res.sendStatus(404);
    }
})

// @desc Like/Unlike a Users Post
router.post('/like/:User_id/:Post_id', async (req, res) => {
    try {
        Posts.findById({_id: req.params.Post_id})
        .then(Post => {
            if (Post.likes.filter(users_like => users_like.user.toString() === req.params.User_id).length > 0) {
                // Unlike if liked from this User
                const Index = Post.likes.map(item => item.user.toString()).indexOf(req.params.User_id);

                // Splice it out of the array
                Post.likes.splice(Index, 1);
            } else {
                // Add the User to the liked list
                Post.likes.unshift({user: req.params.User_id});
            }

            Post.save().then(Post => res.json(Post));
        })
        .catch(err => res.send(err));
    } catch (error) {
        return res.sendStatus(400);
    }
})

// @desc Comment on a Users Post
router.post('/comment/:id', (req, res) => {
    Posts.findById({_id: req.params.id})
    .then(Post => {
      const newComment = {
        user: req.body.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
      }

      // Add a new comment to the array
      Post.comments.push(newComment);
      Post.save().then(Post => res.json(Post))
    })
    .catch(err => res.status(404).json({postnotfound: 'No post found'}));
})

// @desc Delete a comment on a Users Post

module.exports = router;