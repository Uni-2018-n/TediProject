const express			= require('express');
const UploadController  = require('../controllers/Upload.js');

const router  = express.Router();

//all routes are starting with /upload

router.get('/files', UploadController.getFiles);

router.post('/', UploadController.upload.single('file'), UploadController.uploadFile);

router.get('/files/:md5', UploadController.getUsersFiles);

// router.delete('/:id', UserController.deleteUser);

// router.patch('/:id', UserController.updateUser);

module.exports = router;