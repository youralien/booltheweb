var express = require('express'),
	question = require('./questions');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	router.post('/mobilelogin', // this is the url where android users can get their credentials
		function(req, res) { 
			var bCrypt = require('bcrypt-nodejs');
			var User = require('../models/user'); 

            var email = req.body.email;
            var password = req.body.password;
            User.findOne({ 'email' :  email }, // find users with this email
                function(err, user) {
                    // In case of any error, return
                    if (err)
                        return done(err);
                    // Username does not exist, tell app that this username is free to make an account
                    if (!user){
                        res.send({valid: true});
                        return;    
                    } else if (!isValidPassword(user, password)) {
                        res.send({valid: false});  // this username is taken, but the password is wrong
                        return;
                    }
                    // User and password both match, return user
                    res.send(user);
				}
			);
        }
	);

	var isValidPassword = function(user, password){
		var bCrypt = require('bcrypt-nodejs');
        return bCrypt.compareSync(password, user.password);
    }

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup'), function(req, res) {
		var User = require('../models/user');
        var body = req.body;
        User.findOne({ 'email' :  body.email }, // find users with this email
                function(err, user) {
                    // In case of any error, return
                    if (err)
                        return done(err);
                    // User and password both match, return user
					user.age = body.age;
					user.gender = body.gender;
					user.race = body.race;
					user.city = body.city;
					user.state = body.state;
					user.occupation = body.occupation;

					// save the user
					user.save(function(err) {
							if (err) {
								console.log('Error in Saving user: '+err);  
								throw err;  
							}
							console.log('User Registration succesful');
							return user;
						}
					);
                    res.redirect('/home');
				}
			);
/*
		// set the user's local credentials
		newUser.password = createHash(body.password);
		newUser.email = body.email;
		newUser.firstName = body.firstName;
		newUser.lastName = body.lastName;
		newUser.age = body.age;
		newUser.gender = body.gender;
		newUser.race = body.race;
		newUser.city = body.city;
		newUser.state = body.state;
		newUser.occupation = body.occupation;

		// save the user
		newUser.save(function(err) {
				if (err) {
					console.log('Error in Saving user: '+err);  
					throw err;  
				}
				console.log('User Registration succesful');
				return newUser;
			}
		);
		res.send(newUser);
		return newUser;
		*/
	});

	/* Handle Registration POST */
	router.post('/followup',  
		function(req, res) {
			var User = require('../models/user');
			var body = req.body;
			age = body.age;
			gender = body.gender;
			race = body.race;
			city = body.city;
			state = body.state;
			occupation = body.occupation;
			console.log(age);
			console.log(gender);
			console.log(race);
			console.log(req.user);
            res.redirect('/home');
		}
	);

	/* Handle Registration POST for mobile */
	router.post('/mobilesignup', 
		function(req, res) {
			var User = require('../models/user');
            var body = req.body;
            var newUser = new User();

			// set the user's local credentials
			newUser.password = createHash(body.password);
			newUser.email = body.email;
			newUser.firstName = body.firstName;
			newUser.lastName = body.lastName;
			newUser.age = body.age;
			newUser.gender = body.gender;
			newUser.race = body.race;
			newUser.city = body.city;
			newUser.state = body.state;
			newUser.occupation = body.occupation;

			// save the user
			newUser.save(function(err) {
					if (err) {
						console.log('Error in Saving user: '+err);  
						throw err;  
					}
					console.log('User Registration succesful');
					return newUser;
				}
			);
			res.send(newUser);
			return newUser;
		}
	);

    // Generates hash using bCrypt
    var createHash = function(password){
		var bCrypt = require('bcrypt-nodejs');
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

	/* Handle Registration POST */
	router.get('/followup', function(req, res) {
			res.render('followup',{message: req.flash('message')});
		}
	);

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* GET Ask [Questions]*/
	router.get('/ask', isAuthenticated, function(req, res) {
		res.render('ask', {user:req.user});
	});

	/* POST Ask [Questions]*/
	router.post('/ask', function(req, res) {
		question.addQuestion(req, res)
		res.redirect('/home');
	});

	router.get('/me', isAuthenticated, function(req, res) {
		console.log(req.user._id);
		res.render('me', {user:req.user})
	});

	router.get('/user/:id', function(req, res) {
    	var id = req.params.id;
		var User = require('../models/user');
	    User.findOne({ '_id' :  id }, // find users with this email
            function(err, user) {
                // In case of any error, return
                if (err)
                    return done(err);
                // Username does not exist, tell app that this username is free to make an account
                if (!user){
                    res.send();
                    return;    
                } 
                // User and password both match, return user
                res.send(user);
			}
		);
	});

	router.get('/users', function(req, res) {
		var User = require('../models/user');
	    User.findOne({ firstName: "JJJJJ"}, // find users with this email
            function(err, user) {
                // In case of any error, return
                res.send(user);
			}
		);
	})

	router.get('/deleteall', question.deleteAll);
	router.get('/questions/user/:userid', question.findQuestionsByUser);
	router.get('/questions', question.findAll);
	router.get('/questions/last/:time', question.findAllFromTime);
	router.get('/questions/:id', question.findById);
	router.put('/questions/:id', question.addAnswer);
	router.post('/questions', question.addQuestion);
	router.delete('/questions/:id', question.deleteQuestion);

	return router;
}





