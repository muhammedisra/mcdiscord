const { Client, Intents, Collection, MessageEmbed} = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const mongoose = require("mongoose");
const fs = require('fs');
const crypto = require("crypto");
const ms = require("ms");
const ps = require('pretty-ms');
const { DateTime } = require("luxon");
const { Settings } = require("luxon");
Settings.defaultZoneName = "Asia/Kolkata";
Settings.defaultLocale ="en-IN";
const {dbschema, vcsch} = require("./../db");
const { valo } = require("./../api");

const command = new Collection();
const command_files = fs.readdirSync("./commands").filter(file=>file.endsWith(".js"));
for(const file of command_files){
    const cmd = require(`./../commands/${file}`);
    command.set(cmd.name, cmd);
}

module.exports = bot =>{
    bot.on('messageCreate', async msg=>{

        const args = msg.content.toLowerCase().split(/ +/);
        const co = command.get(args[0]);
        if(co)
        co.execute(msg,bot);

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
        client.application.commands.create({name:"valorantstore",description:"Shows your valorant store",options:[{required:true,name:"username",description:"Valorant Usernname",type:"STRING"},{required:true,name:"password",description:"Valorant Passoword",type:"STRING"}]});
        if(msg.content.toLowerCase().startsWith("vctime")){
            let idu
            if(msg.mentions.users.first())
             idu = msg.mentions.users.first().id;
            else
             idu = msg.author.id;
            const db = new mongoose.model(`vc${msg.guildId}`,vcsch);
            let data = await db.findOne({userid: idu});
            if(!data)
            msg.channel.send("This user havent joined voice");
            else
            msg.channel.send(ps(data.time));
        }
        if(msg.content.toLowerCase().startsWith("vclb")){
            const db = new mongoose.model(`vc${msg.guildId}`,vcsch);
            const sort = await db.find().sort("-time");
            const lbem = new MessageEmbed();
            let a = "Voice chat Leaderboard \n \n" ;
            for(let i=0;i<sort.length;i++){
              a = a+ `${i+1}.   **${(await msg.guild.members.fetch(sort[i].userid)).user.username}**   - ${ms(sort[i].time)} \n`
            }
            lbem.setDescription(a);
            lbem.setColor("RANDOM");
            msg.channel.send({ embeds: [lbem] });
          }
        if(msg.content.toUpperCase() === "HELLO"){
            msg.reply('HELLO FRIEND');
        }
        if(msg.content.toLowerCase().startsWith("encrypt")){
            const sp = msg.content.split(" ");
            const en = crypto.createHash('sha256').update(sp[1]).digest('hex');
            msg.channel.send(en);   
        } 
        if(msg.content === "Who is your master bot"){
            msg.reply('Isra is my master');
        }
        if (msg.content.toLowerCase() === "random") { // checks if the message says "?random"
            msg.channel.send(String(Math.floor(Math.random()*10000))); // sends a message to the channel with the number
        }
        if(msg.content.toLowerCase() == "toss"){
            const no = Math.floor(Math.random()*2);
            if(no == 1)
            msg.channel.send("Heads");
            if(no == 0)
            msg.channel.send("Tail");
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
        msg.guild.emojis.cache.forEach(em =>{
            if(msg.content.includes(em.name))
                msg.react(em.id);
        })
        if(msg.content.toLowerCase() == 'motivation'){
            a = await valo("https://www.affirmations.dev/");
            msg.channel.send(a.affirmation);
        }
     })
}