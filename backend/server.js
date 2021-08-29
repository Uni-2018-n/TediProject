const express		 = require('express');
const session        = require('express-session');
const hbs            = require('express-handlebars');
const path           = require('path');
const crypto         = require('crypto');
const mongoose       = require('mongoose');
const Grid           = require('gridfs-stream');
const cors           = require('cors');
const passport       = require('passport');
const localStrategy  = require('passport-local');
const bcrypt         = require('bcrypt');
const jwt            = require('jsonwebtoken');
// const hbs            = require('hbs');

const https          = require('https');
const fs             = require('fs');
const { connect }    = require('http2');
const options = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem')
};

const methodOverride = require('method-override');

const connection    = require('./db.js');
const UserInDb      = require('./models/SignUp.js');
// const LogInRoutes   = require('./routes/LogIn.js');
const SignUpRoutes  = require('./routes/SignUp.js');
const UploadRoutes  = require('./routes/Uploads.js');
const PostsRoutes   = require('./routes/Posts.js');
const ChatRoutes    = require('./routes/Chat.js');

const app = express();

// Connect to db
connection();

// Init gfs
let gfs;

mongoose.connection.once('open', () => {
  // Init stream
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});
// 
// Middleware
app.engine('hbs', hbs({ extname: '.hbs' }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('/home/smackflad/Documents/uni/6o/tedi/Project/TediProject/Antonis/tediproject/src' + '/public'));
// console.log(__dirname);
app.use(session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserInDb.findById(id, function(err, user) {
        done(err ,user);
    });
});

passport.use(new localStrategy(function (email, password, done) {
    UserInDb.findOne({ email: email }, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect email.' });

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) return done(err);
            if (res == false) return done(null, false, {message: 'Incorrect password.' });

            return done(null, user);
        });

        // IF THE EMAIL IS THE ADMINS THEN REDIRECT TO /users AND GET ALL USERS
        if (email == "admin") return true;
        else return false;
    });
}));

////////////////////////

app.use('/users', SignUpRoutes);
// app.use('/', LogInRoutes);
app.use('/upload', UploadRoutes);
app.use('/posts', verifyToken, PostsRoutes);
app.use('/chat', verifyToken, ChatRoutes);

/////////////////////////////// LOGIN ROUTES
// app.post('/home')

app.post('/login', async (req, res) => {

    const user = await UserInDb.findOne({ email: req.body.email })
    .then(async (result) => {
        if (result) {
            const check = await bcrypt.compare(req.body.password, result.password);

            if (check == false) {
                res.send({flag: false, message: 'Incorrect password.' });
                return {};
            }
            else {
                // res.send(result);
                return result;
            }
        }
        else
            res.send({ flag: false, message: 'Incorrect email.' });
    })
    .catch((err) => {
        console.log(err);
        console.log("test1");
    });

    jwt.sign({user: user}, 'secretkey', (err, token) => {
        res.json({
            flag: true,
            token,
            firstname: user.firstname,
            lastname: user.lastname,
            ProfilePic: user.ProfilePic
        });
    });
});

// TOKEN FORMAT
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    // Check bearer
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');

        // Get token for array
        req.token = bearer[1];
        next();
    } else {
        res.sendStatus(403);
    }
}


/////////////////////////////////

app.use('/', (req, res) => {
    res.send('hello');
    // res.render('index');
});

https.createServer(options, app).listen(8000);