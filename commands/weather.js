const { valo } = require("./../api.js");
const { MessageEmbed } = require('discord.js');
const { DateTime } = require("luxon");
const { Settings } = require("luxon");
Settings.defaultZoneName = "Asia/Kolkata";
Settings.defaultLocale = "en-IN";
module.exports = {
    async execute(msg){
        let a = await valo("https://api.openweathermap.org/data/2.5/weather?q=aluva,india&units=metric&appid=2edf00afb0dcf94bf49a976279cd8a19");
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
}