const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on('ready', () =>{
    console.log('this bot is online');
    bot.user.setActivity('Theory of relativity', { type: 'STREAMING' , url: 'https://www.twitch.tv/pokimane' });
 })

bot.on('message', msg=>{
    if(msg.content.toLowerCase().includes("john")){
        msg.channel.send({files: ['https://cdn.discordapp.com/attachments/811949916887711775/814860063499223080/magik.png']});
    }
    if(msg.content.toUpperCase() === "HELLO"){
        msg.reply('HELLO FRIEND');
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
        let time = new Date().toLocaleTimeString('en-IN', {timeZone: 'Asia/Calcutta'});
        msg.channel.send(time);
    }
    if(msg.content.toLowerCase() === "date"){
        let date = new Date().toLocaleDateString('en-IN', {timeZone: 'Asia/Calcutta'});
        msg.channel.send(date);
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
         .setThumbnail(user.displayAvatarURL());
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
})

bot.on("messageDelete", del =>{
    if(del.channel.id == "787302397902979073")
    bot.channels.cache.get("851053934986395721").send(del.content+"\n Author "+del.author.username);
  })

  bot.on("guildMemberUpdate", (om , nm ) =>{
    //console.log(om.nickname);
    //console.log(nm.nickname);
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
