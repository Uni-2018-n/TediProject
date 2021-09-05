const express			= require('express');
const JobController    = require('../controllers/Jobs.js');
const upload            = require('../middleware/upload.js');
const dotenv            = require('dotenv');
dotenv.config();

const router  = express.Router();

//all routes are starting with /jobs

// @desc Get the list of Jobs of all (non) Connected_with Users
router.get('/:User_id', JobController.getJobs);

// @desc List a new Job
router.post('/', JobController.createJob);

// router.get('/:id', JobController.getJob);

// router.delete('/:id', JobController.deleteJob);

// router.patch('/:id', JobController.updateJob);

// @desc Connect or disconnect with a User
// router.post('/connect/:id/:connect_id', JobController.connectUser)

module.exports = router;