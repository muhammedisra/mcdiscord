const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const { MessageEmbed } = require('discord.js');
const axios = require("axios");
const { DateTime } = require("luxon");
const { Settings } = require("luxon");
Settings.defaultZoneName = "Asia/Kolkata"
Settings.defaultLocale ="en-IN"

bot.on('ready', () =>{
    console.log('this bot is online');
    bot.user.setActivity('Theory of relativity', { type: 'STREAMING' , url: 'https://www.twitch.tv/pokimane' });
 })

bot.on('messageCreate', async msg=>{
    if(msg.content.toLowerCase().includes("!john cringe")){
        const johny = ['https://cdn.discordapp.com/attachments/811949916887711775/814860063499223080/magik.png', 'https://cdn.discordapp.com/attachments/720477094714540122/854565024906739722/Screenshot_414.png', 'https://cdn.discordapp.com/attachments/720477094714540122/854565565162848266/Screenshot_416.png'];
        var a = Math.floor(Math.random()*3);
        msg.channel.send({files: [johny[a]]});
        //console.log(a)
    }
    if(msg.content.toUpperCase() === "HELLO"){
        msg.reply('HELLO FRIEND');
    }
    
if(msg.content.toLowerCase() == "timetable"){
    const sub = ['Physics', 'Chemistry', 'Maths', 'Computer', 'English', 'Enjoy Class Over'];
    const teacher = ['Cherian','Dhanya','Sherly', 'Akshara', 'Imma or Lakshmi','Do you need Teacher for that'];
    const teacher2 = ['Gayathri','Sruthi','Bini','Akshara', 'Imma or Lakshmi','Do you need teacher for that'];
    let teach
    let date = DateTime.now();
    let subb;
    const sec = (date.hour*60*60)+(date.minute*60);
    

    switch(date.weekday){
        case 1 :{
            if(sec>=25200 && sec<=31500)
            {subb = sub[2];teach = teacher[2];}
            if(sec>=31500 && sec<=35100)
            {subb = sub[1];teach = teacher[1];}
            if(sec>=35100 && sec<=38700)
            {subb = sub[3];teach = teacher[3];}
            if(sec>=38700 && sec<=42300)
            {subb = sub[0];teach = teacher[0];}
            if(sec>=42300 && sec<=45900)
            {subb = sub[4];teach = teacher[4];}
            if(sec>=45900)
            {subb = sub[5];teach = teacher[5];}
            //msg.channel.send(subb);
            break;

        }
        case 2:{
            if(sec>=25200 && sec<=31500)
            {subb = sub[0];teach = teacher2[0];}
            if(sec>=31500 && sec<=35100)
            {subb = sub[3];teach = teacher2[3];}
            if(sec>=35100 && sec<=38700)
            {subb = sub[4];teach = teacher2[4];}
            if(sec>=38700 && sec<=42300)
            {subb = sub[1];teach = teacher2[1];}
            if(sec>=42300 && sec<=45900)
            {subb = sub[2];teach = teacher2[2];}
            if(sec>=45900)
            {subb = sub[5];teach = teacher2[5];}
            //msg.channel.send(subb);
            break;
        }
        case 3 :{
            if(sec>=25200 && sec<=31500)
            {subb = sub[2];teach = teacher[2];}
            if(sec>=31500 && sec<=35100)
            {subb = sub[1];teach = teacher[1];}
            if(sec>=35100 && sec<=38700)
            {subb = sub[0];teach = teacher[0];}
            if(sec>=38700 && sec<=42300)
            {subb = sub[4];teach = teacher[4];}
            if(sec>=42300 && sec<=45900)
            {subb = sub[3];teach = teacher[3];}
            if(sec>=45900)
            {subb = sub[5];teach = teacher[5];}
            //msg.channel.send(subb);
            break;
        }
        case 4:{
            if(sec>=25200 && sec<=31500)
            {subb = sub[4];teach = teacher2[4];}
            if(sec>=31500 && sec<=35100)
            {subb = sub[2];teach = teacher2[2];}
            if(sec>=35100 && sec<=38700)
            {subb = sub[0];teach = teacher2[0];}
            if(sec>=38700 && sec<=42300)
            {subb = sub[3];teach = teacher2[3];}
            if(sec>=42300 && sec<=45900)
            {subb = sub[1];teach = teacher2[1];}
            if(sec>=45900)
            {subb = sub[5];teach = teacher2[5];}
            //msg.channel.send(subb);
            break;
        }
        case 5:{
            if(sec>=25200 && sec<=31500)
            {subb = sub[1];teach = teacher[1];}
            if(sec>=31500 && sec<=35100)
            {subb = sub[3];teach = teacher[3];}
            if(sec>=35100 && sec<=38700)
            {subb = sub[4];teach = teacher[4];}
            if(sec>=38700 && sec<=42300)
            {subb = sub[0];teach = teacher[0];}
            if(sec>=42300 && sec<=45900)
            {subb = sub[2];teach = teacher[2];}
            if(sec>=45900)
            {subb = sub[5];teach = teacher[5];}
            //msg.channel.send(subb);
            break;
        }
        case 6:{
            msg.channel.send("Today is Saturday You Idiot");
            subb = 'Gaming';
            teach = 'Minecraft';
            break;
        }
        case 7:{
            msg.channel.send("Today is sunday Are you mad?");
            subb = 'Gaming';
            teach = "Minecraft";
            break;
        }
        default :{
            msg.channel.send("Sorry unable to fetch timetable");
            subb = 'Gaming';
            teach = "Minecraft";
            break;
        }
    }
        var a = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("TimeTable")
        .addFields(
            { name: "Subject", value: subb},
            {name:"Teacher", value:teach},
            { name:"Time", value:date.toLocaleString(DateTime.TIME_SIMPLE)},
            { name: "Day", value:date.weekdayLong}
        );
    msg.channel.send({embeds : [a]});
    

    }
    if(msg.content.toLowerCase() === "bye"){
        msg.reply('bye , But my master(isra) will be online most of the time');
    }
    if(msg.content === "Adharsh"){
        msg.reply('He is the biggest padippi in the world and doesnt spend any time for recreation');
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
        msg.react("🆗");
         let no = msg.mentions.users.size;
         if(no == 0){
           var  user = msg.author;
         }
         else {
           var user = msg.mentions.users.first();
         }
         var member = msg.guild.members.cache.get(user.id);
         var jdate = new Date(member.joinedAt);
         var cdate = new Date(user.createdAt);
         var embed = new MessageEmbed()
         .setColor("97FF00")
         .setTitle(user.username + "#" + user.discriminator)
         .addFields(
           { name: "Account created Date", value: cdate.toLocaleDateString("en-IN")},
           { name: "Joined server at ", value: jdate.toLocaleDateString("en-IN")},
           { name: "Nickname", value: member.nickname || "none"},
           { name: "User Id", value: user.id },
           { name: "Roles", value: String(member.roles.cache.size-1)}
         )
         .setThumbnail(user.displayAvatarURL({ dynamic: true }));
         msg.channel.send({ embeds : [embed]});
         
         }
 msg.guild.emojis.cache.forEach(em =>{
        if(msg.content.includes(em.name))
            msg.react(em.id);
    })


if(msg.content.toLowerCase().startsWith("bulkdelete")){
    var mm = msg.content.split(" ");
    if (!(msg.author.id == "711077815784570952" || msg.author.id == "671012726192996352" || msg.author.id == "724668146614665359"))
    {
        msg.channel.send("Sorry you do not have permission for this action");
    }
    else if(mm[1]>100)
    {
        msg.channel.send("Argument must be less than 100");
    }
     else{
        //console.log(mm);
        if(!Number(mm[1]))
            msg.channel.send("Invalid Argument");
        else
           msg.channel.bulkDelete(mm[1]);
     }
    }
    if(msg.content.toLowerCase().startsWith("vs")){
        let user = msg.content.substring(3);
        var ind = user.indexOf('#');
        var tag = user.substring(ind+1)
        var name = user.substring(0,ind);
        var url1 = 'https://api.henrikdev.xyz/valorant/v1/mmr/ap/'+name+'/'+tag;
        let a = await valo(url1);
        console.log(a)
         if( a == undefined)
         
        msg.channel.send("No user found");
         else if(a.status == 200)
         {
             console.log(a)
            const valembed = new MessageEmbed()
            .setColor("DARK_RED")
            .setTitle(user)
            .setThumbnail("https://i.imgur.com/O3oribA.png")
            .addFields(
                {name: "Rank", value: a.data.currenttierpatched},
                {name: "Rank Tier", value: String(a.data.ranking_in_tier)+"/100"},
                {name: "Last game rank change", value: String(a.data.mmr_change_to_last_game)}
            );
            msg.channel.send({ embeds: [valembed] });
    
         }
        else
         msg.channel.send("Unknown error occured");
    
    }
    
 })

bot.on("messageDelete", del =>{
    if(del.channel.id == "787302397902979073")
    bot.channels.cache.get("851053934986395721").send(del.content+"\n Author "+del.author.username);
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




  const valo = async (url) => {
    try {
        var format = "";
        await axios.get(url).then((response ) => {
            format = response.data;
        });
        return format;
    } catch(error){
        //console.log("NO user");
    }
}



bot.login(process.env.token);
