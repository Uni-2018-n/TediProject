const express  = require("express");
const Chat     = require('../models/Chat.js');
const mongoose = require("mongoose");

const router = express.Router();

// Create a new chat
router.post("/get/:User_Id/:Friend_Id", async (req, res) => {
    const newChat = new Chat();

    try {
        result = await Chat.findOne({ chaters: {
            $in: [mongoose.Types.ObjectId(req.params.User_Id)],
            $in: [mongoose.Types.ObjectId(req.params.Friend_Id)]
        }});

        if (result) {
            return res.send(result);
        }

        newChat.chaters.unshift(req.params.User_Id);
        newChat.chaters.unshift(req.params.Friend_Id);

        newChat.save()
        .then(
            newChat => res.json(newChat)
        )
        .catch ((err) => {
            res.status(400).json(err)
        });
    } catch (error) {
        res.status(400).json(error)
    }
});


// @desc Get a User's chat list
router.get("/:User_Id", async (req, res) => {
    try {
        const result = await Chat.find({ chaters: { $in: [ mongoose.Types.ObjectId(req.params.User_Id) ] } });
        res.json(result);
    } catch (error) {
        res.status(400).json(error)
    }
})

// @desc Get one Chat
// router.get("", async (req, res) => {
//     try {
        

//             chat.chaters = result.chaters;
//             chat.messages = result.messages;

//             chat.save()
//             .then(
//                 chat => res.json(chat)
//             )
//             .catch ((err) => {
//                 res.status(400).json(err)
//             });
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

// @desc New message
router.post('/message/:id', (req, res) => {
    Chat.findById({_id: req.params.id})
    .then(chat => {
        const newMessage = {
            sender: req.body.sender,
            text: req.body.text,
            avatar: req.body.avatar
        }

        // Check if sender is in chat
        if (chat.chaters.filter(id => id.toString() == req.body.sender).length === 0) {
            return res.status(404).json({chat: 'Sender not found'})
        }
        // Add a new message to the array
        chat.messages.unshift(newMessage);
        chat.save().then(chat => res.json(chat));
    })
    .catch(err => res.status(404).json({chat: 'No chat found'}));
})

// @desc Delete a message in Chat
router.delete('/message/:message_id/:Chat_id', (req, res) => {
    Chat.findById({_id: req.params.Chat_id})
    .then(chat => {
        if (chat.messages.filter(user_comment => user_comment._id.toString() === req.params.message_id).length === 0) {
            return res.status(404).json({chat: 'Message not found'})
        }
        
        const Index = chat.messages.map(item => item._id.toString()).indexOf(req.params.message_id);

        // Splice it out of the array and save the edited Post
        chat.messages.splice(Index, 1);
        chat.save().then(chat => res.json(chat));
    }).catch(err => res.status(404).json({chat: 'Chat not found'}));
})

module.exports = router;