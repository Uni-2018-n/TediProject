const Job = require("../models/Jobs");
const NewUser = require("../models/SignUp");

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

const applyJob = async (req, res) => {}

module.exports = {
    createJob, getJobs, applyJob// getUser, deleteUser, updateUser, connectUser
}