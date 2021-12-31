const { MessageEmbed } = require('discord.js');
const { valo } = require("../api.js");

module.exports = {
    name: "vs",
    async execute(msg){
        let user = msg.content.substring(3);
        var ind = user.indexOf('#');
        var tag = user.substring(ind+1)
        var name = user.substring(0,ind);
        var url1 = 'https://api.henrikdev.xyz/valorant/v1/mmr/ap/'+name+'/'+tag;
        let a = await valo(url1);
        //console.log(a)
         if( a == undefined)
         msg.channel.send("No user found");
         else if(a.status == 200)
         {
             //console.log(a)
            const valembed = new MessageEmbed()
            .setColor("DARK_RED")
            .setTitle(user)
            .setThumbnail("https://i.imgur.com/O3oribA.png")
            .addFields(
                {name: "Rank", value: a.data.currenttierpatched},
                {name: "Rank Tier", value: String(a.data.ranking_in_tier)+"/100"},
                {name: "Last game rank change", value: String(a.data.mmr_change_to_last_game)}
            );
            msg.channel.send({ embeds: [valembed] });
    
         }
        else
         msg.channel.send("Unknown error occured");
    }
}