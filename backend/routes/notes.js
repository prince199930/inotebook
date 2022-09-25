const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE 1 : GET ALL NOTES using GET "api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//ROUTE 2 : ADD A NEW NOTE using POST "api/notes/addnote". Login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        //If there are errors, send them to the client
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body;
        const note = new Note({
            title,
            description,
            tag,
        });
        const savedNote = await note.save();
        res.json(savedNote)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

//ROUTE 3 : UPDATE AN EXISTING NOTE using PUT "api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //CREATE A NEW NOTE OBJECT
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //FIND THE NOTE TO BE UPDATED AND UPDATE IT
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Note not found'); }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not authorized');
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


//ROUTE 4 : DELETE AN EXISTING NOTE using DELETE "api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        //FIND THE NOTE TO BE deleted AND delete IT
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Note not found'); }

        // if(note.user.toString() !== req.user.id){
        //     return res.status(401).send('Not authorized');
        // }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;