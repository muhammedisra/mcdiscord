const { Client, Intents} = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const mongoose = require("mongoose");
const dbschema = require("./db");
const { valo } = require("./api");
const crypto = require("crypto");
const { DateTime } = require("luxon");
const { Settings } = require("luxon");
Settings.defaultZoneName = "Asia/Kolkata"
Settings.defaultLocale ="en-IN"

bot.on('ready', () =>{
    console.log('this bot is online');
    bot.user.setActivity('Theory of relativity', { type: 'STREAMING' , url: 'https://www.twitch.tv/isra77776666' });
 })

bot.on('messageCreate', async msg=>{
    
    if(msg.guildId != "851053934986395718"){
        const db = new mongoose.model(msg.guildId, dbschema);
        db.create({
          message: msg.content,
          author: msg.author.username,
          channel: msg.channel.name,
          channelID: msg.channelId,
          timestamp: msg.createdTimestamp,
          time: DateTime.fromMillis(msg.createdTimestamp).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS)});
    }
    if(msg.content.toUpperCase() === "HELLO"){
        msg.reply('HELLO FRIEND');
    }
    if(msg.content.toLowerCase().startsWith("timetable")){
    require("./commands/timetable").execute(msg);    
    }
    if(msg.content.toLowerCase().startsWith("encrypt")){
        const sp = msg.content.split(" ");
        const en = crypto.createHash('sha256').update(sp[1]).digest('hex');
        msg.channel.send(en);   
    } 
    if(msg.content.toLowerCase().startsWith("animeinfo")){
        require("./commands/animeinfo").execute(msg,bot);
    }
    if(msg.content === "Who is your master bot"){
        msg.reply('Isra is my master');
    }
    if (msg.content.toLowerCase() === "random") { // checks if the message says "?random"
        const number = Math.random()*10000; // generates a random number
        msg.channel.send(number.toString().substring(0,4)); // sends a message to the channel with the number
    }
    if(msg.content.toLowerCase() === "time"){
        let time = DateTime.now();
        msg.channel.send(time.toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET));
    }
    if(msg.content.toLowerCase() === "date"){
        let date = DateTime.now()
        msg.channel.send(date.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY))
    }
    if(msg.content.toLowerCase() === "damn"){
        msg.channel.send('Son');
    }
    if(msg.content.startsWith("info")){
        require("./commands/userinfo").execute(msg);
    }
    msg.guild.emojis.cache.forEach(em =>{
        if(msg.content.includes(em.name))
            msg.react(em.id);
    })
    if(msg.content.toLowerCase() == 'motivation'){
        a = await valo("https://www.affirmations.dev/");
        msg.channel.send(a.affirmation);
    }
    if(msg.content.toLowerCase().startsWith("weather")){
        require("./commands/weather").execute(msg);
    }
    if(msg.content.toLowerCase().startsWith("bulkdelete")){
        require("./commands/bulkdelete").execute(msg);
    }
    if(msg.content.toLowerCase().startsWith("vs")){
        require("./commands/valostats").execute(msg);
    }
    if(msg.content.toLowerCase()=="quote"){
        require("./commands/quote").execute(msg);
    }
 })

bot.on("messageDelete", del =>{
    if(del.channel.id == "787302397902979073" && !del.author.bot){
        bot.channels.cache.get("851053934986395721").send(del.content+"\n Author "+del.author.username);
        if(del.attachments.size != 0)
            bot.channels.cache.get("851053934986395721").send(del.attachments.first().url);
    }
  })

  bot.on("guildMemberUpdate", (om , nm ) =>{
    
    if(om.nickname !== nm.nickname){
      if(om.nickname == null )
      var oldname = om.user.username;
      else
      var oldname = om.nickname;
      if(nm.nickname == null)
      var newname = nm.user.username;
      else
      var newname = nm.nickname;
      bot.channels.cache.get("787302397902979073").send("Username of "+nm.user.toString()+" has been changed from "+oldname+" to "+newname);
    }
  })

bot.login(process.env.token);
