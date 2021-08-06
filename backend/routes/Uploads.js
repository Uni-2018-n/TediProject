const express			= require('express');
const UploadController  = require('../controllers/Upload.js');
const upload            = require('../middleware/upload.js');

const router  = express.Router();

//all routes are starting with /upload

router.get('/files', UploadController.getFiles);

router.post('/', upload.single('file'), UploadController.uploadFile);

router.get('/files/:filename', UploadController.getUsersFiles);

router.delete('/files/:filename', UploadController.deleteFile);

// router.patch('/:id', UserController.updateUser);

module.exports = router;