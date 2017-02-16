var mongoose = require("mongoose");
var passportLocalMongoose =  require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});


// we want to use the mehtods and functionality that come with passport-local-mongoose package in our UserSchema. 
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
