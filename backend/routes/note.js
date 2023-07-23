const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const {body, validationResult} = require("express-validator");
const {ObjectID, ObjectId} = require("mongodb");

//Route 1: Get all the notes using GET:"/api/note/fetchNotes" login
router.get('/fetchNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        res.status(500).send('Some error occurred.')
    }
})

//Route 2: Add a new note using POST:"/api/note/fetchNotes" login
router.post('/addNote', fetchUser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be at least 5 characters').isLength({min: 5})
], async (req, res) => {

    try {
        const {title, description, tag, color} = req.body;
        if (!title || !description || !tag || !color) {
            return res.status(400).json({
                type: "error",
                message: "Please fill all the details"
            })
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({type: "error", message: errors.array()});
        }
        const duplicateNote = await Notes.find({"user": ObjectId(req.user.id), "title":title})
        if(duplicateNote.length!=0){
            return res.status(401).json({
                type:"error",
                message:"Title already exists"
            })
        }
        const notes = await new Notes({
            title, description, tag, color, user: req.user.id
        })
        const savedNote = await notes.save()
        res.status(200).json({
            type: "success",
            message: "Note Added Successfully",
            savedNote
        })
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: 'Some error occurred'
        })
    }
})


//Route 3: Update an existing note using PUT:"/api/note/updateNote" login
router.put('/updateNote/:id', fetchUser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be at least 5 characters').isLength({min: 5})
], async (req, res) => {
    const {title, description, tag, color} = req.body;
    try {
        if (!title || !description || !tag || !color) {
            return res.status(400).json({
                type: "error",
                message: "Please fill all the details"
            })
        }

        const duplicateNote = await Notes.find({"user": ObjectId(req.user.id), "title":title})
        if(duplicateNote.length!=0){
            if(duplicateNote[0].id===req.params.id && duplicateNote[0].title===title && duplicateNote[0].description===description && duplicateNote[0].tag===tag && duplicateNote[0].color===color){
                return res.json({type:"same"})
            }else if(duplicateNote[0].id.toString()!=req.params.id) {
                return res.status(401).json({
                    type: "error",
                    message: "Title already exists"
                })
            }
        }

        const newNote = {
            title,
            description,
            tag,
            color
        };

        //Finding note and updating it
        let note = await Notes.findById(req.params.id);  // taking from /api/note//updateNote/:id
        if (!note) {
            return res.status(404).json({
                type: "error",
                message: "Note not Found"
            })
        }

        //checking id given in params
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                type: "error",
                message: "Not Allowed"
            })
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({
            type: "success",
            message: "Note Updated Successfully",
            note
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            type: "error",
            message: 'Some error occurred'
        })
    }
})

//Route 4: Delete an existing note using DELETE:"/api/note/deleteNote" login
router.delete('/deleteNote/:id', fetchUser, [], async (req, res) => {
    try {
        //Finding note and deleting it
        let note = await Notes.findById(req.params.id);  // taking from /api/note//updateNote/:id
        if (!note) {
            res.status(404).json({
                type: 'error',
                message: 'Not found'
            })
        }

        // checking id given in params
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                type: "error",
                message: 'Action Not allowed'
            })
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({
            type: "success",
            message: "Note Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            type: "error",
            message: 'Some error occurred'
        })
    }
})

module.exports = router;
