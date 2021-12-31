module.exports = bot=>{
    bot.on("messageDelete", del =>{
        if(del.channel.id == "787302397902979073" && !del.author.bot){
            bot.channels.cache.get("851053934986395721").send(del.content+"\n Author "+del.author.username);
            if(del.attachments.size != 0)
                bot.channels.cache.get("851053934986395721").send(del.attachments.first().url);
        }
      })
}