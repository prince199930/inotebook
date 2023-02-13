const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user' || 'studentuser'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: true,
    },
    twitter: {
        type: String,
        required: true,
    },
    instagram: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    database_fileName:{
        type:String,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes', NotesSchema);