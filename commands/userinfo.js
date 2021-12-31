const { MessageEmbed } = require('discord.js');
module.exports = {
      execute(msg){
        msg.react("🆗");
         let no = msg.mentions.users.size;
         if(no == 0){
           var  user = msg.author;
         }
         else {
           var user = msg.mentions.users.first();
         }
         var member = msg.guild.members.cache.get(user.id);
         var jdate = new Date(member.joinedAt);
         var cdate = new Date(user.createdAt);
         var embed = new MessageEmbed()
         .setColor("97FF00")
         .setTitle(user.username + "#" + user.discriminator)
         .addFields(
           { name: "Account created Date", value: cdate.toLocaleDateString("en-IN")},
           { name: "Joined server at ", value: jdate.toLocaleDateString("en-IN")},
           { name: "Nickname", value: member.nickname || "none"},
           { name: "User Id", value: user.id },
           { name: "Roles", value: String(member.roles.cache.size-1)}
         )
         .setThumbnail(user.displayAvatarURL({ dynamic: true }));
         msg.channel.send({ embeds : [embed]});
    }
}