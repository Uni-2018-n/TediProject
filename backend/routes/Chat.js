const express  = require("express");
const Chat   = require('../models/Chat.js');
const mongoose = require("mongoose");

const router = express.Router();

// Create a new chat
router.post("/", (req, res) => {
    const newChat = new Chat();

    try {
        newChat.chaters.unshift(req.body.senderId);
        newChat.chaters.unshift(req.body.receiverId);

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


// Get a User's chat list
router.get("/:User_Id", async (req, res) => {
    try {
        const result = await Chat.find({ chaters: { $in: [ mongoose.Types.ObjectId(req.params.User_Id) ] } });
        res.json(result);
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;