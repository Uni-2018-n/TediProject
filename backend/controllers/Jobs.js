const Job         = require("../models/Jobs");
const Application = require("../models/applications");
const NewUser     = require("../models/SignUp");

const createJob = async (req, res) => {
    const user = await NewUser.findById({_id: req.body.author})
    const newJob = new Job({
        author: req.body.author,
        name: user.firstname.concat(" ", user.lastname),
        avatar: user.ProfilePic,
        Description: req.body.Description,
        Skills: req.body.Skills
    });

    newJob.save()
    .then(
        job => {res.json(job);}
    )
    .catch((err) => {
        res.json(err);
    });
}

const getJobs = async (req, res) => {
    let all_jobs = [];
    try {
        await NewUser.findById({_id: req.params.User_id})
        .then(async (user) => {
            for (const User of user.Connected_users) {
                all_jobs = all_jobs.concat(await Job.find({author: User}));
            }

            all_jobs = all_jobs.concat(await Job.find({$and: [
                    {author: {$nin: user.Connected_users}},
                    {Skills: {$elemMatch: {$in: user.Skills.skills}}}
                ]}))
            res.json({all_jobs});
        })
        .catch((error) => {
            res.json(error)
        })

    } catch (error) {
        res.json(error);
    }
}

const applyJob = async (req, res) => {
    try {
        await Job.findById({_id: req.params.Job_id})
        .then(async (job) => {
            const user = await NewUser.findById({_id: req.body.applicant})
            let filename = '';
            if (req.file) filename = req.file.filename;
            const newApp = new Application({
                applicant: user._id,
                name: user.firstname.concat(" ", user.lastname),
                avatar: user.ProfilePic,
                Description: req.body.Description,
                Skills: req.body.Skills,
                Bio_file: filename
            });

            
            newApp.save()
            .then((application) => {
                job.Applications.unshift(application._id);
                job.save();
                res.json(application);
            })
            .catch((err) => {
                res.json(err);
            });
        })
        .catch((error) => {
            res.json(error)
        })

    } catch (error) {
        res.json(error);
    }
}

const getApplications = async (req, res) => {
    try {
        let applications = [];
        await Job.findById({_id: req.params.Job_id})
        .then(async (job) => {
            for (const JOB of job.Applications) {
                applications = applications.concat(await Application.find({_id: JOB}));
            }
            res.json(applications);        
        })
        .catch((error) => {
            res.json(error)
        })

    } catch (error) {
        res.json(error);
    }
}

const getmyJobs = async (req, res) => {
    try {
        await Job.find({author: req.params.User_id})
        .then((my_jobs) => res.json(my_jobs))
        .catch((err) => res.json(error))
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    createJob, getJobs, applyJob, getApplications, getmyJobs//, deleteUser, updateUser
}