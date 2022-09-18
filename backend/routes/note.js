const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const {body, validationResult} = require("express-validator");

//Route 1: Get all the notes using GET:"/api/note/fetchNotes" login
router.get('/fetchNotes', fetchUser, async(req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred.')
    }
})

//Route 2: Add a new note using POST:"/api/note/fetchNotes" login
router.post('/addNote', fetchUser, [
        body('title', 'Enter a valid title').isLength({min:3}),
        body('description', 'Description must be at least 5 characters').isLength({min: 5})
    ], async(req, res)=>{

    try {
        const {title, description, tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await notes.save()
        res.json(savedNote)
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred.')
    }
})


//Route 3: Update an existing note using PUT:"/api/note/updateNote" login
router.put('/updateNote/:id',fetchUser, [
    ], async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        //Finding note and updating it
        let note = await Notes.findById(req.params.id);  // taking from /api/note//updateNote/:id
        if (!note) {
            res.status(404).send('Not found')
        }

        //checking id given in params
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed')
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note})
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred.')
    }
})

//Route 4: Delete an existing note using DELETE:"/api/note/deleteNote" login
router.delete('/deleteNote/:id',fetchUser, [
], async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        //Finding note and deleting it
        let note = await Notes.findById(req.params.id);  // taking from /api/note//updateNote/:id
        if (!note) {
            res.status(404).send('Not found')
        }

        // checking id given in params
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed')
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted"})
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Some error occurred.')
    }
})

module.exports = router;