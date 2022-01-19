const { vcsch } = require("./../db.js");
const { DateTime } = require("luxon");
const mongoose = require("mongoose");

module.exports = bot =>{
   bot.on("voiceStateUpdate", async (o,n)=>{
     console.log("VC Change ");
  const db = new mongoose.model(`vc${o.guild.id}`,vcsch);
  let data = await db.findOne({userid: o.member.id});
  
  if(!data){
    data = await db.create({userid:o.member.id}, vcsch);
  }
  if(!o.channelId){
    await db.updateOne({userid: String(o.member.id)}, {timestarted: DateTime.now().toMillis()});
  }
  if(!n.channelId){
    if(data.timestarted < DateTime.now().toMillis() && data.timestarted != 0)
    await db.updateOne({userid:o.member.id}, {timestarted: 0, time: data.time + (DateTime.now().toMillis() - data.timestarted)});
  }
})
}