const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgurl:{
        type:String,
        required:[true, "imgurl is required to create a post"]
    },
    user:{
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required:[true,"user id is required to creating a post "]

    }
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel