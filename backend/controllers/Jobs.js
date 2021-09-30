const Job         = require("../models/Jobs");
const Application = require("../models/applications");
const NewUser     = require("../models/SignUp");
const MF          = require('../matrix_factorization');

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


async function recommend() {
    let Data = await new Promise(async (resolve, reject) =>{
        await make_Data_jobs().then(async (data) => {
        
            var R = []
            let counter = 0;
            for (const user of data) {
                R[counter] = []
                var counter2 = 0;
                for (const job of user.jobs) {
                    R[counter][counter2] = job.rating;
                    counter2++;
                }
                counter++;
            }

            N = R.length

            M = R[0].length

            K = 3

            var P = []; // Initialize array
            for (var i = 0 ; i < N; i++) {
                P[i] = []; // Initialize inner array
                for (var j = 0; j < K; j++) { // i++ needs to be j++
                    var num = Math.random();
                    num = (num < 0.1 ? num * 10 : num)
                    P[i][j] = parseFloat(num.toFixed(8));
                }
            }

            var Q = []; // Initialize array
            for (var i = 0 ; i < M; i++) {
                Q[i] = []; // Initialize inner array
                for (var j = 0; j < K; j++) { // i++ needs to be j++
                    var num = Math.random();
                    num = (num < 0.1 ? num * 10 : num)
                    Q[i][j] = parseFloat(num.toFixed(8));
                }
            }

            const nR = await MF.matrix_factorization(R, P, Q, K)

            if (isNaN(nR[0][0])) resolve("NaN")
            else {
                counter = 0
                for (const user of data) {
                    counter2 = 0;
                    for (const job of user.jobs) {
                        job.rating = Math.round(nR[counter][counter2]);
                        counter2++;
                    }
                    counter++;
                }
                resolve(data)
            }
        })
        .catch((error) => {console.log(error)});
    })
    return Data
}

async function make_Data_jobs() {
    let data = []

    try {
        let Data = await new Promise(async (resolve, reject) =>{
            await NewUser.find().exec(async function(err, Users) {
                await Job.find().exec(async function(err, Jobs) {
                    for (const user of Users) {
                        if (user.email == "admin") continue;
                        let jobs = []
                        for (const job of Jobs) {
                            var value = 0;
                            for (const app of job.Applications) {
                                const App = await Application.findById(app)
                                if (App.applicant.toString() == user._id.toString()) value+=4;
                            }

                            jobs.unshift({
                                job: job._id,
                                rating: value
                            })
                        }
                        
                        data.push({
                            user: user._id,
                            jobs: jobs
                        })
                    }
                    resolve(data)
                })
        })})
        return Data;
    } catch (error) {
        console.log(error);
    }
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

            const recommended_jobs = await recommend();

            for (const job of recommended_jobs) {
                if (job.user.toString() == user._id.toString() && req.params.User_id != job.user.toString()) {
                    for (const JOB of job.jobs) {
                        console.log(JSON.stringify(JOB))
                        if (JOB.rating >= 2)
                            all_jobs = all_jobs.concat(await Job.findById(JOB.job))
                    }
                    break;
                }
            }

            all_jobs = all_jobs.filter(function (el) {return el != null;});

            for(let counter = 0; counter < all_jobs.length; counter++){
                if (all_jobs.filter((v) => (v._id.toString() === all_jobs[counter]._id.toString())).length >= 2) {
                    all_jobs.splice(counter, 1);
                    counter--;
                }
            }

            all_jobs = all_jobs.reverse()

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
                Skills: JSON.parse(req.body.Skills),
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
    createJob, getJobs, applyJob, getApplications, getmyJobs, recommend//, updateUser
}