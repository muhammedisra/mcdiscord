const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on('ready', () =>{
    console.log('this bot is online');
})

bot.on('message', msg=>{
    if(msg.content.toUpperCase() === "HELLO"){
        msg.reply('HELLO FRIEND');
    }
    if(msg.content === "Bye"){
        msg.reply('bye , But my master(isra) will be online 24/7');
    }
    if(msg.content === "Adharsh"){
        msg.reply('He is the biggest padippi in the world and doesnt spend any time for recreation');
    }
    if(msg.content === "Who is your master bot"){
        msg.reply('Isra is my master');
    }
    if (msg.content === "random") { // checks if the message says "?random"
        const number = Math.random()*10000; // generates a random number
        let dat = Date.now;
        msg.channel.send(dat);
        msg.channel.send(number.toString().substring(0,4)); // sends a message to the channel with the number
    }
})

bot.login(process.env.token);
