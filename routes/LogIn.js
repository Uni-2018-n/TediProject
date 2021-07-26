const express			= require('express');
const passport			= require('passport');
const LogInController   = require('../controllers/LogIn_Cont.js');

const router = express.Router();

//all routes are starting with /

// if the user is logged in then go to home page, else go to login page
router.get('/', LogInController.isLoggedIn, LogInController.LoggedOutUser);

// if the user is logged out then go to login page, else go to home page
router.get('/login', LogInController.isLoggedOut, LogInController.LoggedInUser);

router.post('/login', passport.authenticate('local', {
	successRedirect: '/', // If the logIn was successful then redirect
	failureRedirect: '/login?error=true'
}));

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/about', (req, res) => {
	res.render("index", { title: "About" });
});

module.exports = router;