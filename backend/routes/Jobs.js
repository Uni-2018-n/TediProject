const express		   = require('express');
const JobController    = require('../controllers/Jobs.js');
const upload           = require('../middleware/upload.js');
const dotenv           = require('dotenv');
dotenv.config();

const router  = express.Router();

//all routes are starting with /jobs

// @desc Get the list of Jobs of all (non) Connected_with Users
router.get('/:User_id', JobController.getJobs);

// @desc Get Job applications
router.get('/applications/:Job_id', JobController.getApplications);

// @desc List a new Job
router.post('/', JobController.createJob);

// @desc Apply for a Job
router.post('/:Job_id', upload.single('file'), JobController.applyJob);

// router.delete('/:id', JobController.deleteJob);

// router.patch('/:id', JobController.updateJob);

module.exports = router;