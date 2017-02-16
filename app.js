var express = require("express");
var app = express(); 
var passport= require("passport");
var bodyParser = require("body-parser");
var User =  require("./models/user");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/authDemo");

// notice that this's the setup to render ejs template
app.set("view engine", "ejs");

app.use(require("express-session")({
	// this secret message gonna use for encode or decode the sessions... 
	secret:"awesome bullets",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize()); 
app.use(passport.session());

// those two methods responsible for reading and taling the data from session that's encoded. deserializer is for uncode it. 
// we don't have to do user.serializeUser. we're using the one come with passportlicaomongoose just telling passport to use
passport.serializeUser(	User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
	res.render("home");
});


app.get('/secret', function(req, res){
	res.render("secret");
});




var port= 3000; 



app.listen(port, function() {	
       console.log('Listening to port:' + port); 
});