const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//You're free to define your User how you like. Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

//Additionally, Passport-Local Mongoose adds some methods to your Schema. like authenticate register See the API Documentation section for more details.

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin:{
    type:Boolean,
    default:false,
},  profilePicture:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxzhZoMmVEKyvy6lDQiXjxrbrzRxVt0KCQJsSmZnWwBA&s"
}
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", UserSchema);
