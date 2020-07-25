const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on('ready', () =>{
    console.log('this bot is online');
})

bot.on('message', msg=>{
    if(msg.content === "HELLO"||"Hello"){
        msg.reply('HELLO FRIEND');
    }
    if(msg.content === "Bye"){
        msg.reply('bye');
    }
    if(msg.content === "Adharsh"){
        msg.reply('He is DEAD');
    }
})

bot.login(process.env.token);
