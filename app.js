var express = require("express");
var app = express(); 
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/authDemo");

// notice that this's the setup to render ejs template
app.set("view engine", "ejs");



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