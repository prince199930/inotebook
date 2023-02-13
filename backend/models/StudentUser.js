const mongoose = require('mongoose');
const {Schema} = mongoose;

const StudentUserSchema = new Schema({
   
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const StudentUser = mongoose.model('studentuser', StudentUserSchema);
module.exports = StudentUser;