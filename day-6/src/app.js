const express = require("express");
const noteModel = require("./models/notes.model");
const app = express();

app.use(express.json());

// POST method to create a note
app.post("/notes", async (req, res) => {
    const { title, description } = req.body;

    const note = await noteModel.create({
        title,
        description
    });

    // send response inside the route
    res.status(201).json({
        message: "Note created successfully",
        note
    });
})

// get method to fetch all notes

app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()
        res.status(200).json({
            message: "notes fetched successfully",
            notes
        })
    })


module.exports = app;