const express			= require('express');
const session           = require('express-session');
const hbs               = require('express-handlebars');
const mongoose          = require('mongoose');
const dotenv            = require('dotenv');
const cors              = require('cors');
const passport          = require('passport');
const localStrategy     = require('passport-local');
const bcrypt            = require('bcrypt');
const https             = require('https');
const fs                = require('fs');

const options = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem')
};

const UserInDb          = require('./models/SignUp.js');
const LogInRoutes       = require('./routes/LogIn.js');
const SignUpRoutes      = require('./routes/SignUp.js');

const app = express();
const PORT = 5000;
dotenv.config();

// Middleware
app.engine('hbs', hbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
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
    });
}));

////////////////////////

app.use('/users', SignUpRoutes);
// app.use('/', LogInRoutes);

mongoose.connect(process.env.DATABASE_ACCESS,
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
    console.log("Connected to the database!");
    // Listen to requests when connection to db is established
    // app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
    https.createServer(options, app).listen(8000);
    })
    .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

