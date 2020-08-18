const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on('ready', () =>{
    console.log('this bot is online');
})

bot.on('message', msg=>{
    if(msg.content === "HELLO"){
        msg.reply('HELLO FRIEND');
    }
    if(msg.content === "Bye"){
        msg.reply('bye , But my master(isra) will be online 24/7');
    }
    if(msg.content === "Adharsh"){
        msg.reply('He is DEAD');
    }
    if(msg.content === "Who is your master bot"){
        msg.reply('Isra is my master');
    }
})

bot.login(process.env.token);
