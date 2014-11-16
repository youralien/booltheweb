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

	router.post('/mobilelogin',
		passport.authenticate('login'),
		function(req, res) { 
			// If this function gets called, authentication was successful.
			// `req.user` contains the authenticated user.
            res.send(req.user);
		}
	);

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/followup',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* Handle Registration POST */
	router.post('/mobilesignup', 
		passport.authenticate('signup'), 
		function(req, res) {
            res.send(req.user);
		}
	);

	/* Handle Registration POST */
	router.get('/followup', function(req, res) {
			res.render('followup',{message: req.flash('message')});
		}
	);

	/* Handle Registration POST */
	router.post('/followup',  
		function(req, res) {
			var User = require('../models/user');
			var thing = req.body;
			console.log(thing.age);
			/*
			age = req.params('age');
			gender = req.params('gender');
			race = req.params('race');
			city = req.params('city');
			state = req.params('state');
			occupation = req.params('occupation');
			console.log(age);
			console.log(gender);
			console.log(race);
			*/
            res.send(req.user);
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
	router.post('/ask', isAuthenticated, function(req, res) {
		question.addQuestion(req, res)
		res.redirect('/home');
	});

	router.get('/deleteall', question.deleteAll);

	router.get('/questions', question.findAll);
	router.get('/questions/last/:time', question.findAllFromTime);
	router.get('/questions/:id', question.findById);
	router.put('/questions/:id', question.addAnswer);
	router.post('/questions', question.addQuestion);
	router.delete('/questions/:id', question.deleteQuestion);

	return router;
}





