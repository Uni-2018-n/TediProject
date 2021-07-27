// import { v4 as uuidv4 } from 'uuid';
const NewUser = require('../models/SignUp.js');
const bcrypt  = require('bcrypt');

const getUsers = (req, res) => {
    NewUser.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
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
                        UserImage: req.file.path
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