const mongoose = require("mongoose");



//******************* MONGOOSE DATABASE **********************//
const DBS = process.env.db;
mongoose.connect(DBS, {
  useNewUrlParser: true
}).then( console.log("Connected to database"));
//******************* MONGOOSE DATABASE **********************//



exports.dbschema = new mongoose.Schema({
    message: String,
    author: String,
    channel: String,
    channelID: Number,
    timestamp: Number,
    time: String
});

exports.vcsch = new mongoose.Schema({
  userid: String,
  time:{
    default: 0,
    type: Number
  },
  timestarted:{
    default: 0,
    type: Number
  }
});

