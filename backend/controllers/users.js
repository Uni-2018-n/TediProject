// import { v4 as uuidv4 } from 'uuid';
const NewUser           = require('../models/SignUp.js');
const UploadController  = require('../controllers/Upload.js');
const bcrypt            = require('bcrypt');
const mongoose          = require('mongoose');
const Grid              = require('gridfs-stream');

// Init gfs
let gfs;

mongoose.connection.once('open', () => {
  // Init stream
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
})

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
        //             // nizar = await UploadController.getUsersFiles(temp)
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
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
}

const createUser = (req, res) => {
    console.log(req.file);
    let securePassword;

    const used = NewUser.findOne({ email: req.body.email })
    .then((result) => {
        if (result) res.send("This email is already registed.");
        else {
                void async function() {
                    securePassword = await bcrypt.hash(req.body.password, 10)
    
                    const post = new NewUser ({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        number: req.body.number,
                        password: securePassword,
                        ProfilePic: req.file.filename
                    });
                
                    post.save()
                    .then((result) => {
                        res.send('/about');
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

module.exports = {
    getUsers, getUser, createUser, deleteUser, updateUser
}