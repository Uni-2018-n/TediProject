const express		 = require('express');
const session        = require('express-session');
// const hbs         = require('express-handlebars');
const cors           = require('cors');
const passport       = require('passport');
const localStrategy  = require('passport-local');
const bcrypt         = require('bcrypt');

const https          = require('https');
const fs             = require('fs');
const { connect }    = require('http2');
const options = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem')
};

const methodOverride = require('method-override');

const UserInDb       = require('./models/SignUp.js');
const LogInRoutes    = require('./routes/LogIn.js');
const SignUpRoutes   = require('./routes/SignUp.js');
const UploadRoutes   = require('./routes/Uploads.js');

const app = express();

// Middleware
// app.engine('hbs', hbs({ extname: '.hbs' }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// app.use(session({
//     secret: "verygoodsecret",
//     resave: false,
//     saveUninitialized: true
// }));
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

app.use('/', (req, res) => {
    res.render('index');
});

https.createServer(options, app).listen(8000);