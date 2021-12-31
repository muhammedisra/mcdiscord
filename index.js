const { Client, Intents} = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
const mongoose = require("mongoose");
const fs = require('fs');
const dbschema = require("./db");
const { valo } = require("./api");
const crypto = require("crypto");
const { DateTime } = require("luxon");
const { Settings } = require("luxon");
Settings.defaultZoneName = "Asia/Kolkata"
Settings.defaultLocale ="en-IN"

const event_files = fs.readdirSync('./events').filter(file => file.endsWith(".js"));
for(const file of event_files){
    require(`./events/${file}`)(bot);
}

bot.login(process.env.token);
