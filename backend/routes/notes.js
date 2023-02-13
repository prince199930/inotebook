const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const path = require('path')
const { body, validationResult } = require('express-validator');
const CompanyMiddleWare = require('../middleware/ComapnayMiddleWare');

router.get('/fetchallnotesStudent', CompanyMiddleWare, async (req, res) => {
    try {
        const notes = await Note.find({});
        res.json(notes);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//ROUTE 1 : GET ALL NOTES using GET "api/notes/fetchallnotes". Login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
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
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
    body('linkedin', 'linkedin must be atleast 5 characters').isLength({ min: 5 }),
    body('twitter', 'twitter must be atleast 5 characters').isLength({ min: 5 }),
    body('instagram', 'instagram must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    console.log(req.body,"INSETTED")
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const image = req.files;
        const newpath = path.join(__dirname, "../")
        console.log(newpath, 'newpathjbds')
        let database_fileName = '';
        Object.entries(image).forEach(async ([key, value]) => {
            console.log(key, value);
            const file = value;
            let filename = file.name;
            console.log(`filename`, filename);
            database_fileName = filename;
            file.mv(`${newpath + "/uploads/apk/" + filename}`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });

        const { title, description, linkedin, twitter, instagram, content } = req.body;
        const note = new Note({
            title,
            description,
            linkedin,
            twitter,
            instagram,
            content,
            database_fileName,
            user: req.user.id
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
router.post('/updatenote/:id', fetchUser, async (req, res) => {
    console.log("req.body", req.body)
    console.log("req.files", req.files)
    try {
        //FIND THE NOTE TO BE UPDATED AND UPDATE IT
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Note not found'); }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not authorized');
        }

        if(req.files){

    const { title, description, twitter, linkedin, instagram, content } = req.body;
            const image = req.files;
            const newpath = path.join(__dirname, "../")
            console.log(newpath, 'newpathjbds')
            let database_fileName ;
            Object.entries(image).forEach(async ([key, value]) => {
                console.log(key, value);
                const file = value;
                let filename = file.name;
                // filename = filename.split(' ').join('_');
                // let tempFileName = value.name
                // filename += uniqueIdGenerator();
                // var ext = path.extname(file.name || "").split(".");
                // console.log(" ext[ext.length - 1]",  ext[ext.length - 1])
                // filename = filename + "." + ext[ext.length - 1];
                console.log(`filename`, filename);
                database_fileName = filename;
                file.mv(`${newpath + "/uploads/apk/" + filename}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            });
            //CREATE A NEW NOTE OBJECT
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (linkedin) { newNote.linkedin = linkedin };
            if (twitter) { newNote.twitter = twitter };
            if (instagram) { newNote.instagram = instagram };
            if (content) { newNote.content = content };
            if (database_fileName) { newNote.database_fileName = database_fileName };
    
    
    
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ note });
        }
        else{
            const { etitle, edescription, etwitter, elinkedin, einstagram,  } = req.body.note;
            const content = req.body.econtent

            const database_fileName = req.body.eimage
            //CREATE A NEW NOTE OBJECT

            const newNote = {};
            if (etitle) { newNote.title = etitle };
            if (edescription) { newNote.description = edescription };
            if (elinkedin) { newNote.linkedin = elinkedin };
            if (etwitter) { newNote.twitter = etwitter };
            if (einstagram) { newNote.instagram = einstagram };
            if (content) { newNote.content = content };
            if (database_fileName) { newNote.database_fileName = database_fileName };
    
    
    
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ note });
        }
       
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})
//ROUTE 4 : DELETE AN EXISTING NOTE using DELETE "api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    // const { title, description, tag } = req.body;

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