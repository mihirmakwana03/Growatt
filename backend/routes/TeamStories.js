const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const TeamStory = require('../models/TeamStory');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/storyImg'); // This folder should exist
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = Date.now() + ext;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

// Route to get all team stories
router.get('/', async (req, res) => {
    try {
        const teamStories = await TeamStory.find();
        res.json(teamStories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to add a new team story
router.post('/add', upload.single('image'), async (req, res) => {
    const { name, designation, message } = req.body;
    const image = req.file.filename; // File name of the uploaded image

    try {
        const newTeamStory = new TeamStory({
            name,
            designation,
            message,
            image,
        });

        await newTeamStory.save();
        res.status(201).json(newTeamStory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a team story by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const teamStory = await TeamStory.findById(req.params.id);
        if (!teamStory) {
            return res.status(404).json({ message: 'Team story not found' });
        }

        const imagePath = path.join(__dirname, '..', 'public', 'storyImg', teamStory.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await teamStory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Team story deleted' });
    } catch (err) {
        console.error("Error during delete operation:", err);
        res.status(500).json({ message: 'Error deleting team story' });
    }
});


module.exports = router;
