var mongoose = require ('mongoose');

var userSchema = mongoose.Schema({
    alias: String,
    nationality : String,
    lastName: String,
    firstName: String,
    email: String,
    password: String,
    token: String
   });

var userModel=mongoose.model ('user',userSchema)

module.exports=userModel;