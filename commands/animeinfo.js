const { MessageEmbed } = require('discord.js');
const { valo } = require("../api.js");

module.exports = {
    async execute(msg,bot){
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
}