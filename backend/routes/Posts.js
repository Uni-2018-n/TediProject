const express  = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const upload   = require('../middleware/upload.js');
const Posts    = require('../models/Posts.js');
const jwt      = require('jsonwebtoken');
const NewUser  = require('../models/SignUp');
const MF       = require('../matrix_factorization');

const router = express.Router();

//all routes are starting with /posts

// @desc Create a new post
router.post('/', upload.fields([{name: 'photos'},{name: 'videos'}, {name: 'voices'}]), async (req, res) => {
    // Dont forget to check if post is valid (check library validator)

    // console.log(req.files.photos)
    // res.sendStatus(200);
    let pics = [];
    let vids = [];
    let voice = [];
    if(req.files.photos) await req.files.photos.forEach((pic) => {pics.push(pic.filename)})
    if(req.files.videos) await req.files.videos.forEach((vid) => {vids.push(vid.filename)})
    if(req.files.voices) await req.files.voices.forEach((voic) => {voice.push(voic.filename)})
    const user = await NewUser.findById({_id: req.body.author})
    const Post = new Posts({
        author: req.body.author,
        text: req.body.text,
        pictures: pics,
        videos: vids,
        voice_recordings: voice,
        name: user.firstname.concat(" ", user.lastname),
        avatar: user.ProfilePic
    });

    Post.save()
    .then(
        post => {res.json(post);}
    )
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
})

router.get('/Data/posts', async (req, res) => {
    await make_Data().then(async (data) => {
        
        var R = []
        let counter = 0;
        for (const user of data) {
            R[counter] = []
            var counter2 = 0;
            for (const post of user.posts) {
                R[counter][counter2] = post.rating;
                counter2++;
            }
            counter++;
        }

        console.log(R);
        R = [

            [5,3,0,1],
       
            [4,0,0,1],
       
            [1,1,0,5],
       
            [1,0,0,4],
       
            [0,0,0,0],
           
            [2,1,3,0],
       
           ]

           console.log(R);

        N = R.length

        M = R[0].length

        K = 3

        var P = []; // Initialize array
        for (var i = 0 ; i < N; i++) {
            P[i] = []; // Initialize inner array
            for (var j = 0; j < K; j++) { // i++ needs to be j++
                P[i][j] = Math.random();
            }
        }

        P = [[ 0.47541428  ,1.685651,    1.77578809],
        [ 0.39228876  ,1.57102566 , 1.11317869],
        [ 1.98855887 , 0.60674616, -0.3658349 ],
        [ 1.71279801 , 0.10962353 , 0.2765648 ],
        [ 0.46567216,  0.00622198 , 0.63384642],
        [ 0.61811477 , 0.73850125,  0.62027099]]

        var Q = []; // Initialize array
        for (var i = 0 ; i < M; i++) {
            Q[i] = []; // Initialize inner array
            for (var j = 0; j < K; j++) { // i++ needs to be j++
                Q[i][j] = Math.random();
            }
        }

        Q = [[ 0.26914547 , 1.54206489 , 1.27311644],
        [ 0.47061552 , 0.5840557 ,  0.9404649 ],
        [ 1.08232288 , 1.48432495 , 1.63394157],
        [ 2.35931281 , 0.2737889 , -0.3220709 ]]
        const nR = await MF.matrix_factorization(R, P, Q, K)

        if (isNaN(nR[0][0])) res.send("NaN")
        else res.send(nR)
    })
    .catch((error) => {console.log(error)});
})

async function make_Data() {
    let data = []

    try {
        let Data = await new Promise(async (resolve, reject) =>{
            await NewUser.find().exec(async function(err, Users) {
                await Posts.find().exec(function(err, Posts) {
                    for (const user of Users) {
                        let posts = []
                        for (const post of Posts) {
                            var value = 0;
                            user.Liked_Posts.forEach((p) => {if (p.post.toString() == post._id.toString())  value++;})
                            let times = 0;
                            for (const comment of post.comments) {
                                if (comment.user.toString() == user._id.toString()) times++;
                            }
                            if (times == 1) value += 2;
                            else if (times >= 2) value += 3;
                            posts.unshift({
                                post: post._id,
                                rating: value
                            })
                        }
                        
                        data.push({
                            user: user._id,
                            posts: posts
                        })
                    }
                    resolve(data)
                })
        })})
        return Data;
    } catch (error) {
        console.log(error);
    }
    
}

// @desc HomePage - Get all the Posts of the Users friends and others
router.get('/:User_id', async (req, res) => {
    let all_posts = [];
    const Users_Posts = await Posts.find({author: req.params.User_id});
    all_posts = all_posts.concat(Users_Posts);

    try {
        await NewUser.findById({_id: req.params.User_id})
        .then(async (user) => {
            for (const User of user.Connected_users) {
                all_posts = all_posts.concat(await Posts.find({author: User}));

                await NewUser.findById({_id: User})
                .then(async (connected_user) => {
                    for (const post of connected_user.Liked_Posts) {
                        all_posts = all_posts.concat(await Posts.findById(post.post));
                    }
                })
            }

            all_posts = all_posts.filter(function (el) {return el != null;});

            for(const post of all_posts){
                if (all_posts.filter((v) => (v._id.toString() === post._id.toString())).length >= 2) {
                    const Index = all_posts.map(item => item._id.toString()).indexOf(post._id.toString());
                
                    all_posts.splice(Index, 1);
                }                
            }

            res.json({all_posts});
        })
        .catch((error) => {
            console.log(error)
        })
        
    } catch (error) {
        res.json(error);
    }
})

// @desc Get all the Posts of a User
router.get('/:id', (req, res) => {
    Posts.find({author: req.params.id})
    .then((result) =>
        res.json({result})
    )
    .catch(err => res.status(404).json({post: 'This User has no posts'}));
})

// @desc Get a specific Post
router.get('/getpost/:id', (req, res) => {
    Posts.find({_id: req.params.id})
    .then((result) =>
        res.json({result})
    )
    .catch(err => res.status(404).json({post: 'This post doesnt exist'}));
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
        var like = 0;
        const user = await NewUser.findById({_id: req.params.User_id});
        await Posts.findById({_id: req.params.Post_id})
        .then(Post => {
            if (Post.likes.filter(users_like => users_like.user.toString() === req.params.User_id).length > 0) {
                // Unlike if liked from this User
                
                const Index = Post.likes.map(item => item.user.toString()).indexOf(req.params.User_id);
                const post_index = user.Liked_Posts.map(item => item.post.toString()).indexOf(req.params.Post_id);

                // Splice it out of the array
                Post.likes.splice(Index, 1);
                user.Liked_Posts.splice(post_index, 1);
            } else {
                // Add the User to the liked list
                like = 1;
                Post.likes.unshift({user: req.params.User_id});
                user.Liked_Posts.unshift({post: req.params.Post_id});
            }

            Post.save().then(async (Post) => {
                if (like == 1) {
                    if (!(Post.author.toString() === user._id.toString())) {
                        const author = await NewUser.findById({_id: [mongoose.Types.ObjectId(Post.author)]});
                        author.Notifications.unshift({
                            user: req.params.User_id,
                            post: Post._id,
                            type: "Like"
                        });
                        author.save();
                    }
                }
                res.json(Post);
                user.save();
            });
            
        })
        .catch(err => res.send(err));
    } catch (error) {
        return res.sendStatus(400);
    }
})

// @desc Comment on a Users Post
router.post('/comment/:id', async (req, res) => {
    const user = await NewUser.findById({_id: req.body.user})

    await Posts.findById({_id: req.params.id})
    .then(async (Post) => {
      const newComment = {
        user: req.body.user,
        text: req.body.text,
        name: user.firstname.concat(" ", user.lastname),
        avatar: user.ProfilePic
      }

        if (!(Post.author.toString() === user._id.toString())) {  
            const author = await NewUser.findById({_id: [mongoose.Types.ObjectId(Post.author)]});
            author.Notifications.unshift({
                user: req.body.user,
                post: Post._id,
                type: "Comment"
            });
            author.save();
        }

        // Add a new comment to the array
        Post.comments.unshift(newComment);
        Post.save().then(Post => res.json(Post.comments))
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