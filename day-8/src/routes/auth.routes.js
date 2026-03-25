const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    // 1. check user exist
    const isUserAlreadyExist = await userModel.findOne({ email })
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    // 2. create user
    const user = await userModel.create({ name, email, password })

    // 3. generate token
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET
    )

    res.cookie("JWT_token", token)

    // 4. send response
    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })
})

module.exports = authRouter