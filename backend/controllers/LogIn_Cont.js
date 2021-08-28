function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/user');
}

function isLoggedOut(req, res, next) {
	if (!req.isAuthenticated()) return next();
	res.redirect('/');
}

const LoggedOutUser = (req, res) => {
	res.render("index", { title: "Home" });
};

const LoggedInUser = (req, res) => {
    const response = {
		title: "Login",
		error: req.query.error
	}

	res.render('login', response);
};

module.exports = {
    LoggedOutUser, LoggedInUser, isLoggedIn, isLoggedOut
}