var express = require("express");
var app = express(); 
var passport= require("passport");
var bodyParser = require("body-parser");
var User =  require("./models/user");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/authDemo");
// var connection = mongoose.createConnection("mongodb://localhost/authDemo", {server: {poolSize: 1}});


// notice that this's the setup to render ejs template
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
	// this secret message gonna use for encode or decode the sessions... 
	secret:"awesome bullets",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize()); 
app.use(passport.session());


passport.use(new localStrategy(User.authenticate()));// User.authenticate from passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/// ROUTES

app.get("/", function(req, res){
	res.render("home");
});


app.get("/secret",isLoggedIn, function(req, res){
   res.render("secret"); 
});

app.get('/login', function(req, res) {
	res.render("login"); 
});

/// AUTH ROUTES
app.get("/register", function(req, res){
	res.render('register');
}); 

app.post("/register", function(req, res){ 
	//handleing user sign up
		User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect('/secret');
		});
	});
});


app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");

}); 

//handle user login , middleware: passport.authenticate()
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req, res) {
});


function isLoggedIn(req, res, next) {
	//isAuthenticated is the function from passport 
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");

}


var port= 3000; 



app.listen(port, function() {	
       console.log('Listening to port:' + port); 
});