const NewUser  = require('../models/SignUp');

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

    const users = await connected_users.find({
        $or: [{"firstname": {$regex: req.params.name}},
              {"lastname": {$regex: req.params.name}}]
    },
    {
        _id: 1,
        firstname: 1,
        lastname: 1,
        ProfilePic: 1
    });
    res.send(connected_users);
}

module.exports = {
    getUsers, getUsers_Friends
}