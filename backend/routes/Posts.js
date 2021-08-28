const express  = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const upload   = require('../middleware/upload.js');
const Posts    = require('../models/Posts.js');
const jwt      = require('jsonwebtoken');
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
router.post('/:id', (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, token) => {
        
        if(err) {
            res.sendStatus(403);
        } else {
            Posts.find({author: req.params.id})
            .then((result, authData) =>
                res.json({
                    result,
                    authData
                })
            )
            .catch(err => res.status(404).json({post: 'This User has no posts'}));
        }
    });
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
    .catch(err => res.status(404).json({post: 'No post found'}));
})

// @desc Delete a comment on a Users Post
router.delete('/comment/:comment_id/:Post_id', (req, res) => {
    Posts.findById({_id: req.params.Post_id})
    .then(Post => {
        if (Post.comments.filter(user_comment => user_comment._id.toString() === req.params.comment_id).length === 0) {
            return res.status(404).json({post: 'Comment not found'})
        }
        
        const Index = Post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

        // Splice it out of the array and save the edited Post
        Post.comments.splice(Index, 1);
        Post.save().then(Post => res.json(Post));
    }).catch(err => res.status(404).json({post: 'Post not found'}));
})

module.exports = router;