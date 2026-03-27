const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exists"],
        required:[true,"username is required"]

    },
    email:{
        type:String,
        unique:[true,"email already exists"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/93cvfu89u5/Test_Fpdfa7vgN?updatedAt=1771678262765 "
    }




})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel
