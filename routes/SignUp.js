const express			= require('express');
const UserController    = require('../controllers/users.js');

const router = express.Router();

//all routes are starting with /users

router.get('/', UserController.getUsers);

router.post('/', UserController.createUser);

router.get('/:id', UserController.getUser);

router.delete('/:id', UserController.deleteUser);

router.patch('/:id', UserController.updateUser);

module.exports = router;