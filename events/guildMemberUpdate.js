module.exports = bot=>{
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
}