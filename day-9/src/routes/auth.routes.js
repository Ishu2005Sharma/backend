const express = require("express")
const authRouter = express.Router()
const userModel = require("../models/user.model")


// post method 
authRouter.post("/register", async(req,res)=>{
    const {name,email,password} = req.body

    

})


module.exports = authRouter

