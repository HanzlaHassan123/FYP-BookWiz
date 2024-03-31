const express=require('express')
const router=express.Router()
const catchAsync=require('../utils/catchAsync')
//const Note= require('../models/notes')
//const Note=require('../models/notes')
const Note=require('../models/notes')
const ExpressError=require('../utils/ExpressError')
const joi=require('joi')
const {notesSchema}=require('../joiSchemas')
const {isLoggedIn}=require('../middleware')

validateNotes = (req, res, next) => {
    const { error } = notesSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/new',isLoggedIn,validateNotes, catchAsync(async (req, res, next) => {
    console.log("body  "+JSON.stringify(req.body))
    const{title,description,tag}=req.body

    const note = new Note({
        title,
        description,
        tag,
        user:req.user._id
    });
   // const note = new Note(req.body.note);
    console.log("note"+note)
    await note.save();
    res.send(note);
}));

router.get('/all',isLoggedIn, catchAsync(async (req, res) => {
    const notes = await Note.find({user:req.user._id});
    res.send(notes);
}));

router.get('/:id',isLoggedIn, catchAsync(async (req, res) => {  
    const note = await Note.findById(req.params.id);
    res.send(note);
}));

router.get('/',(req,res)=>{
    res.send("Hello from notes")
})

module.exports=router