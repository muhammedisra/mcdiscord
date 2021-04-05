const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on('ready', () =>{
    console.log('this bot is online');
    bot.user.setActivity('Theory of relativity', { type: 'STREAMING' , url: 'https://www.youtube.com/channel/UCYBeMUfEI6_EK_YWKA3zV_Q' });
 })

bot.on('message', msg=>{
    if(msg.content.toUpperCase() === "HELLO"){
        msg.reply('HELLO FRIEND');
    }
    if(msg.content.toLowerCase() === "bye"){
        msg.reply('bye , But my master(isra) will be online 24/7');
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
})

bot.login(process.env.token);
