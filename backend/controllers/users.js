// import { v4 as uuidv4 } from 'uuid';
const NewUser           = require('../models/SignUp.js');
const UploadController  = require('../controllers/Upload.js');
const bcrypt            = require('bcryptjs');
const jwt               = require('jsonwebtoken');
const fs                = require('fs');
const FormData          = require('form-data');
const convert           = require('xml-js');
const mongoose          = require('mongoose');

const getUsers = async (req, res) => {
    try {
        const result = await NewUser.find({},
            {
                _id: 1,
                firstname: 1,
                lastname: 1,
                ProfilePic: 1
            }
        )

        // result.forEach( async function(table) {
        //     try {
        //         if (table.ProfilePic) {
        //             temp = {filename: table.ProfilePic}
                        
        //             console.log(table.ProfilePic);
        //             const file = await gfs.files.findOne({ filename: table.ProfilePic });
        //             // File exists
        //             const readStream = gfs.createReadStream(file.filename);
        //             readStream.pipe(res)
        //             // return res.json(file)
        //             await UploadController.getUsersFiles(temp)
        //             console.log(temp);
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // });

        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

const getUser = (req, res) => {
    NewUser.findById({_id: req.params.id})
    .then((result) => {
        res.json({
                _id: result._id,
                firstname: result.firstname,
                lastname: result.lastname,
                ProfilePic: result.ProfilePic
            });
    })
    .catch(err => res.status(404).json({user: 'This user doesnt exist'}));
}

const createUser = (req, res) => {
    let securePassword;
    //let  pp

    const used = NewUser.findOne({ email: req.body.email })
    .then((result) => {
        if (result != null) {
            res.json({
                "message": "This email is already registed.",
                "boolean": false
            })
        }
        else {
                void async function() {
                    securePassword = await bcrypt.hash(req.body.password, 10)
    
                    let filename = '';
                    if (req.file) filename = req.file.filename;
                    const user = new NewUser ({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        number: req.body.number,
                        password: securePassword,
                        ProfilePic: filename
                    });

                    user.save()
                    .then((result) => {
                        res.json({
                            "boolean": true
                        })
                    })
                    .catch((err) => {
                        res.json(err);
                    });
                }();
            }
    })
    .catch((err) => {
        console.log(err);
    });
}

const deleteUser = (req, res) => {
    const {id} = req.params;
    NewUser.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/'}) // redirect to home page
        // res.send(`The user with the id ${id} is a loser so we deleted him`);
    })
    .catch((err) => {
        console.log(err);
    });
}

const updateUser = (req, res) => {
    const {id} = req.params;
    // console.log(req.file)
    // The new data we want to patch
    NewUser.findByIdAndUpdate(id, req.body)
    .then(async (result) => {
        if (req.body.firstname) result.firstname = req.body.firstname;
        if (req.body.lastname) result.lastname = req.body.lastname;
        if (req.body.age) result.age = req.body.age;
        if (req.file) result.ProfilePic = req.file.filename;
        if (req.body.email) result.email = req.body.email;
        if (req.body.password) {
            const securePassword = await bcrypt.hash(req.body.password, 10);
            result.password = securePassword;
        }
        if (req.body.Education) result.Education = req.body.Education;
        if (req.body.Skills) result.Skills = req.body.Skills;
        if (req.body.number) result.number = req.body.number;
        if (req.body.Experience) {
            req.body.Experience.Experience = req.body.Experience.Experience.reverse();
            result.Experience = req.body.Experience;
        }

        jwt.sign({result: result}, 'secretkey', (err, token) => {
            res.json({
                flag: true,
                token,
                _id: result._id,
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                ProfilePic: result.ProfilePic,
                number: result.number,
                Education: result.Education,
                Experience: result.Experience
            });
        });
        result.save();
    })
    .catch((err) => {
        console.log(err);
    });
}

const connectUser = (req, res) => {
    NewUser.findById({_id: req.params.id})
    .then(async User => {
        const other_user = await NewUser.findById({_id: req.params.connect_id});
        if (User.Connected_users.filter(connected_users => connected_users._id.toString() === req.params.connect_id).length > 0) {
            // Disconnect if already connected with this User
            const Index = User.Connected_users.map(item => item._id.toString()).indexOf(req.params.connect_id);
            const sencond_Index = other_user.Connected_users.map(item => item._id.toString()).indexOf(req.params.id);

            // Splice it out of the array
            User.Connected_users.splice(Index, 1);
            other_user.Connected_users.splice(sencond_Index, 1);
        } else {
            // Add the User to the connected list
            const id = other_user.Pending_requests.find(id => id.toString() === req.params.id)
            if (!id) other_user.Pending_requests.unshift(req.params.id);
        }

        User.save().then(User => res.json(User));
        other_user.save();
    })
    .catch(err => res.send(err));
}

const acceptRequest = (req, res) => {
    NewUser.findById({_id: req.params.id})
    .then(async User => {
        const other_user = await NewUser.findById({_id: req.params.connect_id});
        
        // Add the User to the connected list
        User.Connected_users.unshift(req.params.connect_id);
        other_user.Connected_users.unshift(req.params.id);
        User.Pending_requests.shift(req.params.connect_id);

        other_user.save();
        User.save().then(User => res.status(200).send());
    })
    .catch(err => res.send(err));
}

const rejectRequest = (req, res) => {
    NewUser.findById({_id: req.params.id})
    .then(async User => {        
        // Add the User to the connected list
        User.Pending_requests.shift(req.params.connect_id);

        User.save().then(User => res.status(200).send());
    })
    .catch(err => res.send(err));
}

const getConnected = (req, res) => {
    NewUser.findById(req.params.id)
    .then(async User => {
        let connected = [];
        try {
            for (const id of User.Connected_users) {
                const user = await NewUser.findById(id);
                connected.push({
                    id: user._id,
                    name: user.firstname.concat(" ", user.lastname),
                    avatar: user.ProfilePic
                })
            }
            res.json(connected)
        }catch(error){
            res.send(err)
        }
    })
    .catch(err => res.send(err));
}

const getRequest = (req, res) => {
    NewUser.findById({_id: req.params.id})
    .then(async User => {
        let pending = [];
        try {
            for (const id of User.Pending_requests) {
                const user = await NewUser.findById(id);
                pending.push({
                    id: user._id,
                    name: user.firstname.concat(" ", user.lastname),
                    avatar: user.ProfilePic,
                })
            }
            res.json(pending)
        }catch(error){
            console.log("Test")
        }
    })
    .catch(err => res.send(err));
}

const getProfile = (req, res) => {
    NewUser.findById(req.params.id)
    .then((result) => {
        if (req.params.id.toString() == req.params.UserId.toString() || result.Connected_users.includes(req.params.UserId)) {
            res.json({
                ProfilePic: result.ProfilePic,
                name: result.firstname.concat(' ', result.lastname),
                Education: result.Education,
                Skills: result.Skills,
                Experience: result.Experience,
                friends: true
            });
        } else {
            let education = undefined;
            let skills = undefined;
            let experience = undefined;
            if (!result.Education.private) education = result.Education
            if (!result.Skills.private) skills = result.Skills
            if (!result.Experience.private) experience = result.Experience
            res.json({
                ProfilePic: result.ProfilePic,
                name: result.firstname.concat(' ', result.lastname),
                Education: education,
                Skills: skills,
                Experience: experience,
                friends: false
            });
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

const getNotifications = async (req, res) => {
    await NewUser.findById({_id: req.params.User_id})
    .then((user) => {
        res.json(user.Notifications);
    }).catch(err => res.status(404).json({user: 'User not found'}));
}

const getUsersInfo = async (req, res) => {
    try {
        const result = await NewUser.find({},
            {
                _id: 1,
                firstname: 1,
                lastname: 1,
                ProfilePic: 1,
                // Education: 1,
                // Skills: 1,
                number: 1,
                email: 1
            }
        )
        res.send({
            _id: result._id,
            name: result.firstname.concat(" " + result.lastname),
            phoneNumber: result.number,
            email: result.email,
            avatar: result.ProfilePic
        });
    } catch (error) {
        console.log(error);
    }
}

const Json = async (req, res) => {
    try {
        let users = []
        for (const User of req.body.users) {
            users = users.concat(await NewUser.findById(User));
        }
        res.send({users});
        
    } catch (error) {
        console.log(error);
    }
}

const JsontoXml = async (req, res) => {
    try {
        let profile = []
        for (const User of req.body.users) {
            const user = await NewUser.findById(User);
            profile = profile.concat({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                Pending_requests: user.Pending_requests,
                ProfilePic: user.ProfilePic,
                Education: user.Education,
                Skills: user.Skills.for,
                Notifications: user.Notifications,
                number: user.number,
                Liked_Posts: user.Liked_Posts,
                Connected_users: user.Connected_users
            });
        }

        const users = {profile}

        var options = {compact: true, ignoreComment: true, spaces: 4};
        var result = convert.json2xml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + JSON.stringify({users}, null, 2), options);
        fs.writeFile('./users.xml', result, async err => {
            if (err) {
                console.log('Error writing file', err);
            } else {
                console.log('Successfully wrote file');
            }
        })
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers, getUser, createUser, deleteUser, updateUser, connectUser,
    getConnected, acceptRequest, rejectRequest, getRequest, getProfile, getNotifications,
    getUsersInfo, JsontoXml, Json
}