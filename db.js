const mongoose = require("mongoose");



//******************* MONGOOSE DATABASE **********************//
const DBS = process.env.db;
mongoose.connect(DBS, {
  useNewUrlParser: true
}).then( console.log("Connected to database"));
//******************* MONGOOSE DATABASE **********************//



const dbschema = new mongoose.Schema({
    message: String,
    author: String,
    channel: String,
    channelID: Number,
    timestamp: Number,
    time: String
});


module.exports = dbschema;