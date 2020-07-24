const Discord = require('discord.js');
const bot = new Discord.Client();


bot.on('ready', () =>{
    console.log('this bot is online');
})

bot.on('message', msg=>{
    if(msg.content === "HELLO"||"hello"){
        msg.reply('HELLO FRIEND');
    }
    if(msg.content === "Bye"||"bye"){
        msg.reply('Bye');
    }
})

bot.login(process.env.token);
