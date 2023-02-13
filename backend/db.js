const mongoose = require("mongoose");
// const mongoURI = `mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false`
const mongoURI = `mongodb+srv://Prince:princemohan@test1.676cjr9.mongodb.net/?retryWrites=true&w=majority`

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo;
