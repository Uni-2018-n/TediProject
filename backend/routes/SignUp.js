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

// @desc Get Users Profile
router.get('/profile/:id/:UserId', UserController.getProfile);

router.delete('/:id', UserController.deleteUser);

router.patch('/:id', upload.single('file'), UserController.updateUser);

// @desc Send Connect Request or disconnect with a User
router.post('/connect/:id/:connect_id', UserController.connectUser);

// @desc Get Connect Request
router.get('/connect_request/:id', UserController.getRequest);

// @desc Accept Connect Request
router.post('/connect/accept/:id/:connect_id', UserController.acceptRequest);

// @desc Reject Connect Request
router.post('/connect/reject/:id/:connect_id', UserController.rejectRequest);

// @desc Get connected Users
router.get('/connect/:id', UserController.getConnected);

module.exports = router;