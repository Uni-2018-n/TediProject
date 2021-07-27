const express			= require('express');
const UserController    = require('../controllers/users.js');
const multer            = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload  = multer({storage: storage});

const router  = express.Router();

//all routes are starting with /users

router.get('/', UserController.getUsers);

router.post('/', upload.single('UserImage'), UserController.createUser);

router.get('/:id', UserController.getUser);

router.delete('/:id', UserController.deleteUser);

router.patch('/:id', UserController.updateUser);

module.exports = router;