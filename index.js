const { Client, Intents, MessageActionRow, MessageButton  } = require('discord.js');
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
    

    if(msg.content.toUpperCase() === "HELLO"){
        msg.reply('HELLO FRIEND');
    }
    
    if(msg.content.toLowerCase().startsWith("timetable")){
    const date = DateTime.now();
    const sec = (date.hour*60*60)+(date.minute*60);
    let peri = msg.content.substring(10);
    let per;
    if(peri!="" && Number(peri)!=NaN && peri>0 && peri<6)
    per = Number(peri)-1;
    else
    per = period(sec);
    const quote = await valo("https://api.quotable.io/random");
    msg.channel.send(quote.content + "\nAuthor: " + quote.author);
    let a = tbem(per)
    const row = new MessageActionRow()
		.addComponents(
        new MessageButton()
            .setCustomId('perprev')
            .setEmoji(":arrowleft:912351000898203658")
		    .setStyle('PRIMARY'),
        new MessageButton()
			.setCustomId('pernext')
            .setEmoji(":arrowright:912350125349826570")
			.setStyle('PRIMARY'),
			);
    if(per == 0){
      row.components[0].setDisabled();
    }
    if(per == 4){
      row.components[1].setDisabled();
    }
    if(per>4){
      row.components.forEach(e=> e.setDisabled());
    }
    msg.channel.send({ embeds: [a], components: [row] })
    .then(msg =>{
      const filter = i => i.customId === 'perprev' || i.customId == "pernext";
      const collector = msg.createMessageComponentCollector({filter, time: 30000});
      collector.on("collect", async i =>{
        if(i.customId == 'perprev'){
          if(per!=0){
          per--;
          row.components[1].setDisabled(false);
          const e = tbem(per);
          if(per == 0){
            row.components[0].setDisabled();
            i.update({components:[row], embeds:[e]});
          }
          else i.update({embeds:[e], components:[row]})
          }
        }
        if(i.customId == 'pernext'){
          if(per!=4){
          per++;
          row.components[0].setDisabled(false);
          const e = tbem(per);
          if(per == 4){
            row.components[1].setDisabled();
            i.update({components:[row], embeds:[e]});
          }
          else i.update({embeds:[e], components:[row]})
          }
        }
      })
       collector.on("end",() => {
        row.components.forEach(e=> e.setDisabled());
        if(msg.editable)
        msg.edit({components:[row]})
       })
    })
    
        
    }

    if(msg.content.toLowerCase().startsWith("encrypt")){
        const sp = msg.content.split(" ");
        const en = crypto.createHash('sha256').update(sp[1]).digest('hex');
        msg.channel.send(en);
        
    }  



    if(msg.content.toLowerCase().startsWith("animeinfo")){
        try {
            const rate = await valo("https://api.trace.moe/me");
            bot.channels.cache.get("906900512455147530").send(String(rate.quotaUsed));
            bot.channels.cache.get("906900512455147530").send(String(rate.id));
            if(msg.attachments.size == 0)
           msg.channel.send("No image entered");
           else{
           const aniinfo =await valo("https://api.trace.moe/search?cutBorders&anilistInfo&url="+msg.attachments.first().attachment);
           const aniem = new MessageEmbed()
           .setColor("RANDOM")
           .setTitle(String(aniinfo.result[0].anilist.title.english))
           .setDescription(aniinfo.result[0].filename)
           .addFields(
               { name: "Episode", value: String(aniinfo.result[0].episode)},
               { name: "Similarity", value: String(Math.round(aniinfo.result[0].similarity*100))+"%"}
           )
           .setImage(aniinfo.result[0].image);
           msg.channel.send({ embeds: [aniem] });
       }
        } catch (error) {
            console.log(error);
            msg.channel.send("Unknown Error")
        }
       
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


    
    if(msg.content.toLowerCase() == 'motivation'){
        a = await valo("https://www.affirmations.dev/");
        msg.channel.send(a.affirmation);
    }



    if(msg.content.toLowerCase().startsWith("weather")){

        let a = await valo("https://api.openweathermap.org/data/2.5/weather?q=aluva,india&units=metric&appid=2edf00afb0dcf94bf49a976279cd8a19")
        console.log(a)
        var abd = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Weather")
        .setThumbnail("http://openweathermap.org/img/wn/"+a.weather[0].icon+"@2x.png")
        .addFields(
            { name : "Weather", value: a.weather[0].main},
            { name: "Details", value: a.weather[0].description},
            { name: "Temperature", value: String(a.main.feels_like)+" °C"},
            { name: "Humidity", value: String(a.main.humidity)+"%"},
            { name: "Sunrise", value: DateTime.fromSeconds(a.sys.sunrise).toLocaleString(DateTime.TIME_WITH_SECONDS)},
            { name: "Sunset", value: DateTime.fromSeconds(a.sys.sunset).toLocaleString(DateTime.TIME_WITH_SECONDS)},
            { name: " Time Updated", value: DateTime.fromSeconds(a.dt).toLocaleString(DateTime.TIME_WITH_SECONDS)} 
        );
        msg.channel.send({ embeds: [abd] });
    }


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
        //console.log(a)
         if( a == undefined)
         
        msg.channel.send("No user found");
         else if(a.status == 200)
         {
             //console.log(a)
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


    if(msg.content.toLowerCase()=="quote"){
        let a = await valo("https://api.quotable.io/random");
        msg.channel.send(a.content+"\nAuthor: "+a.author);
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

function period(time){
    const ti=[28800,34200,36600,39600,42600,45600];
    if(time>=ti[0] && time<=ti[1])
    return 0;
    if(time>=ti[1] && time<=ti[2])
    return 1;
    if(time>=ti[2] && time<=ti[3])
    return 2;
    if(time>=ti[3] && time<=ti[4])
    return 3;
    if(time>=ti[4] && time<=ti[5])
    return 4;
    if(time>=ti[5] || time<=ti[0])
    return 5;
}

function tbem(period){
    sub = subject(period);
    return new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("TimeTable")
        .addFields(
          { name: "Subject", value: sub[0] },
          { name: "Teacher", value: sub[1] },
          { name: "Period", value: String(period + 1) },
          { name: "Day", value: DateTime.now().weekdayLong }
        );
  }
  

function subject(period){
    const sub1 = ["English","Maths/Biology/Economics","Chemistry/Commerce","Computer/Maths/PE","Physics/Accountancy","Class over"];
    const sub2 = ["Maths/Biology/Accountancy","Physics/Commerce","Computer/Maths/PE","English","Chemistry/Economics","Class over"];
    const sub3 = ["Computer/Maths/PE","Maths/Biology/Accountancy","Chemistry/Economics","Physics/Commerce","English","Class over"];
    const sub4 = ["Chemistry/Economics","English","Maths/Biology/Accountancy","Physics/Commerce","Computer/Maths/PE","Class over"];
    const sub5 = ["Maths/Biology/Commerce","Chemistry/Economics","Computer/Maths/PE","English","Physics/Accountancy","Class over"];
  
    const teach1 = ["Lakshmi", "Sherly/Jit/Lilu", "Dhanya/Nirmala", "Akshara/Sherly/Evelin", "Cherian/Novella", "Enjoy"];
    const teach2 = ["Bini/Jyothi/Novella", "Gayathri/Nirmala", "Akshara/Bini/Evelin", "Imma", "Sruthi/Lilu", "Enjoy"];
    const teach3 = ["Akshara/Sherly/Evelin", "Sherly/Jit/Novella", "Dhanya/Lilu", "Cherian/Nirmala", "Lakshmi", "Enjoy"];
    const teach4 = ["Sruthi/Lilu", "Imma", "Bini/Jyothi/Novella", "Gayathri/Nirmala", "Akshara/Bini/Evelin", "Enjoy"];
    const teach5 = ["Sherly/Jit/Nirmala", "Dhanya/Lilu", "Akshara/Sherly/Evelin", "Lakshmi", "Cherian/Novella", "Enjoy"];

    const week = DateTime.now().weekday;
    let arr=[];
    switch(week){
     case 1:{
        arr[0]=sub1[period];
        arr[1]=teach1[period];
        return arr;
        break;
     }
     case 2:{
        arr[0]=sub2[period];
        arr[1]=teach2[period];
        return arr;
        break;
     }
     case 3:{
        arr[0]=sub3[period];
        arr[1]=teach3[period];
        return arr;
        break;
     }
     case 4:{
        arr[0]=sub4[period];
        arr[1]=teach4[period];
        return arr;
        break;
     }
     case 5:{
        arr[0]=sub5[period];
        arr[1]=teach5[period];
        return arr;
        break;
     }
     case 6:{
         arr[0]="Saturday no class ";
         arr[1]="LoL no";
         return arr;
         break;
     }
     case 7:{
        arr[0]="Sunday no class ";
        arr[1]="LoL no";
        return arr;
        break;
     }
     default:{
         arr[0]="Error fetching timetale";
         arr[1]="Error fetching timetale";
         return arr;
         break;
     }
    }
}


bot.login(process.env.token);
