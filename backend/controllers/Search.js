const NewUser  = require('../models/SignUp');
const mongoose = require("mongoose");

const getUsers = async function (req, res) {
    const users = await NewUser.find({
        $or: [{"firstname": {$regex: req.params.name}},
              {"lastname": {$regex: req.params.name}}]
    },
    {
        _id: 1,
        firstname: 1,
        lastname: 1,
        ProfilePic: 1
    });
    res.send(users);
}

const getUsers_Friends = async function (req, res) {
    const connected_users = await NewUser.find({_id: req.params.id},{Connected_users: 1});

    let users = [];
    for (const connected of connected_users[0].Connected_users) {
        users = users.concat(await NewUser.find({_id: connected,
            $or: [{"firstname": {$regex: req.params.name}},
                  {"lastname": {$regex: req.params.name}}]
        },
        {
            _id: 1,
            firstname: 1,
            lastname: 1,
            ProfilePic: 1
        }));
    }
    
    res.send(users);
}

const getUsersID = async function (req, res) {
    const users = await NewUser.find({
        _id: req.params.id
    },
    {
        _id: 1,
        firstname: 1,
        lastname: 1,
        ProfilePic: 1
    });
    res.send(users);
}

module.exports = {
    getUsers, getUsers_Friends, getUsersID
}