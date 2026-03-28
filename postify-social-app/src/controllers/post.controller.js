const  postModel = require("../models/post.model")
const Imagekit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


const imagekit = new Imagekit({
    privatekey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
  try {
    console.log(req.body, req.file);

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "token not provided",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const file = await imagekit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: "post-image",
    });

    const post = await postModel.create({
      caption: req.body.caption,
      imgUrl: file.url,
      user: decoded.id,
    });

    res.status(201).json({
      message: "post created successfully",
      post,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {createPostController}