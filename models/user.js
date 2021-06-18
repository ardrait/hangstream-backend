const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    id:String,
    email:String,
    profilepic:String,
    roomId:String,
    videoTime:String,
    userType:String,
    movieName:String,
    banner:String,
    movieUrl:String,
    friends:[String]
    });

module.exports = mongoose.model('User',userSchema,"User")