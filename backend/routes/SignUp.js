const express			= require('express');
const UserController    = require('../controllers/users.js');
const upload            = require('../middleware/upload.js');
const dotenv            = require('dotenv');
dotenv.config();

const router  = express.Router();

//all routes are starting with /users

router.get('/', UserController.getUsers);

router.post('/', upload.single('file'), UserController.createUser);

router.get('/:id', UserController.getUser);

router.delete('/:id', UserController.deleteUser);

router.patch('/:id', UserController.updateUser);

// @desc Connect or disconnect with a User
router.post('/connect/:id/:connect_id', UserController.connectUser)

module.exports = router;