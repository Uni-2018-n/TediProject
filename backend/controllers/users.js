// import { v4 as uuidv4 } from 'uuid';
const NewUser           = require('../models/SignUp.js');
const UploadController  = require('../controllers/Upload.js');
const bcrypt            = require('bcrypt');

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
    const {id} = req.params;
    NewUser.findById(id)
    .then((result) => {
        res.json({
                _id: result._id,
                firstname: result.firstname,
                lastname: result.lastname,
                ProfilePic: result.ProfilePic
            });
    })
    .catch((err) => {
        console.log(err);
    });
}

const createUser = (req, res) => {
    let securePassword;
    //let  pp

    const used = NewUser.findOne({ email: req.body.email })
    .then((result) => {
        if (result) res.json({
            "message": "This email is already registed.",
            "boolean": false
        });
        else {
                void async function() {
                    securePassword = await bcrypt.hash(req.body.password, 10)
    
                    let filename = '';
                    if (req.file) filename = req.file.filename;
                    const post = new NewUser ({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        number: req.body.number,
                        password: securePassword,
                        ProfilePic: filename
                    });
                
                    post.save()
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
    // The new data we want to patch
    NewUser.findByIdAndUpdate(id, req.body)
    .then((result) => {
        const {firstname, lastname, age} = req.body;

        if (firstname) result.firstname = firstname;
        if (lastname) result.lastname = lastname;
        if (age) result.age = age;

        res.send(`Your Account has been updated`);
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

        User.save().then(User => res.status(200));
        other_user.save();
    })
    .catch(err => res.send(err));
}

const rejectRequest = (req, res) => {
    NewUser.findById({_id: req.params.id})
    .then(async User => {        
        // Add the User to the connected list
        User.Pending_requests.shift(req.params.connect_id);

        User.save().then(User => res.status(200));
    })
    .catch(err => res.send(err));
}

const getConnected = (req, res) => {
    NewUser.findById({_id: req.params.id})
    .then(async User => {
        let connected = [];
        try {
            for (const id of User.Connected_users) {
                const user = await NewUser.findById(id);
                connected.push({
                    id: user._id,
                    name: user.firstname.concat(" ", user.lastname),
                    avatar: user.ProfilePic,
                    professional_position: user.professional_position,
                    Employment_institution: user.Employment_institution
                })
            }
            res.json(connected)
        }catch(error){
            console.log("Test")
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

module.exports = {
    getUsers, getUser, createUser, deleteUser, updateUser, connectUser,
    getConnected, acceptRequest, rejectRequest, getRequest
}