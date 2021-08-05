const express			= require('express');
const UserController    = require('../controllers/users.js');
const UploadController  = require('../controllers/Upload.js');
const dotenv            = require('dotenv');
dotenv.config();

const router  = express.Router();

//all routes are starting with /users

router.get('/', UserController.getUsers);

router.post('/', UploadController.upload.single('file'), UserController.createUser);

router.get('/:id', UserController.getUser);

router.delete('/:id', UserController.deleteUser);

router.patch('/:id', UserController.updateUser);

module.exports = router;