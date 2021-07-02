const Discord = require('discord.js');
const bot = new Discord.Client();
const { DateTime } = require("luxon");
const { Settings } = require("luxon");
Settings.defaultZoneName = "Asia/Kolkata"
Settings.defaultLocale ="en-IN"

bot.on('ready', () =>{
    console.log('this bot is online');
    bot.user.setActivity('Theory of relativity', { type: 'STREAMING' , url: 'https://www.twitch.tv/pokimane' });
 })

bot.on('message', msg=>{
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
    let date = DateTime.now();
    let subb;
    const sec = (date.hour*60*60)+(date.minute*60);
    

    switch(date.weekday){
        case 1 :{
            if(sec>25200 && sec<31500)
            subb = sub[2];
            if(sec>31500 && sec<35100)
            subb = sub[1];
            if(sec>31500 && sec<38700)
            subb = sub[3];
            if(sec>38700 && sec<42300)
            subb = sub[0];
            if(sec>42300 && sec<45900)
            subb = sub[4];
            if(sec>45900)
            subb = sub[5];
            //msg.channel.send(subb);
            break;

        }
        case 2:{
            if(sec>25200 && sec<31500)
            subb = sub[0];
            if(sec>31500 && sec<35100)
            subb = sub[3];
            if(sec>31500 && sec<38700)
            subb = sub[4];
            if(sec>38700 && sec<42300)
            subb = sub[1];
            if(sec>42300 && sec<45900)
            subb = sub[2];
            if(sec>45900)
            subb = sub[5];
            //msg.channel.send(subb);
            break;
        }
        case 3 :{
            if(sec>25200 && sec<31500)
            subb = sub[2];
            if(sec>31500 && sec<35100)
            subb = sub[1];
            if(sec>31500 && sec<38700)
            subb = sub[0];
            if(sec>38700 && sec<42300)
            subb = sub[4];
            if(sec>42300 && sec<45900)
            subb = sub[3];
            if(sec>45900)
            subb = sub[5]
            //msg.channel.send(subb);
            break;
        }
        case 4:{
            if(sec>25200 && sec<31500)
            subb = sub[4];
            if(sec>31500 && sec<35100)
            subb = sub[2];
            if(sec>31500 && sec<38700)
            subb = sub[0];
            if(sec>38700 && sec<42300)
            subb = sub[3];
            if(sec>42300 && sec<45900)
            subb = sub[1]
            if(sec>45900)
            subb = sub[5]
            //msg.channel.send(subb);
            break;
        }
        case 5:{
            if(sec>25200 && sec<31500)
            subb = sub[1];
            if(sec>31500 && sec<35100)
            subb = sub[3];
            if(sec>31500 && sec<38700)
            subb = sub[4];
            if(sec>38700 && sec<42300)
            subb = sub[0];
            if(sec>42300 && sec<45900)
            subb = sub[2];
            if(sec>45900)
            subb = sub[5];
            //msg.channel.send(subb);
            break;
        }
        case 6:{
            msg.channel.send("Today is Saturday You Idiot");
        }
        case 7:{
            msg.channel.send("Today is sunday Are you mad?");
            break;
        }
        default :{
            msg.channel.send("Sorry unable to fetch timetable");
            break;
        }
    }
        var a = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("TimeTable")
        .addFields(
            { name: "Subject", value: subb},
            { name:"Time", value:date.toLocaleString(DateTime.TIME_SIMPLE)},
            { name: "Day", value:date.weekdayLong}
        );
    msg.channel.send(a);
    

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
    if(msg.content.toLowerCase() === "reyna"){
        msg.react("830784257130627104");
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
         var member = msg.guild.members.cache.get(user.id)
         var jdate = new Date(member.joinedAt);
         var cdate = new Date(user.createdAt);
         var embed = new Discord.MessageEmbed()
         .setColor("97FF00")
         .setTitle(user.username + "#" + user.discriminator)
         .addFields(
           { name: "Account created Date", value: cdate.toLocaleDateString("en-IN")},
           { name: "Joined server at ", value: jdate.toLocaleDateString("en-IN")},
           { name: "Nickname", value: member.nickname || "none"},
           { name: "User Id", value: user.id },
           { name: "Roles", value: member.roles.cache.size-1}
         )
         .setThumbnail(user.displayAvatarURL({ dynamic: true }));
         msg.channel.send(embed)
         
         }
var a = bot.emojis.cache.array();
var i = 0
for(i = 0; i<a.length; i++)
{
    if(msg.content.includes(a[i].name)){
        msg.react(bot.emojis.cache.get(a[i].id));
        //console.log(a[i].id)
    }
    //console.log(a[i].name)
}
if(msg.content.toLowerCase().startsWith("bulkdelete")){
    var mm = msg.content.split(" ");
    if (!msg.guild.members.cache.get(msg.author.id).roles.cache.has("857589875812466720"))
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
  
bot.login(process.env.token);
