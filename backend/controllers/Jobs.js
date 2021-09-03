const Job = require("../models/Jobs");

const createJob = async (req, res) => {
    const user = await NewUser.findById({_id: req.body.author})
    const newJob = new Job({
        author: req.body.author,
        job_title: req.body.job_title,
        company: req.body.company,
        job_location: req.body.job_location,
        employment_type: req.body.employment_type,
        name: user.firstname.concat(" ", user.lastname),
        avatar: user.ProfilePic
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
            res.json({all_jobs});
        })
        .catch((error) => {
            res.json(error)
        })
        
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    createJob, getJobs//, getUser, deleteUser, updateUser, connectUser
}