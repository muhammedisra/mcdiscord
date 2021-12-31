const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed  } = require('discord.js');
const { valo } = require("../api.js");
const { DateTime } = require("luxon");
const { Settings } = require("luxon");
Settings.defaultZoneName = "Asia/Kolkata"
Settings.defaultLocale ="en-IN"


module.exports={

  
 async execute(msg){
    const date = DateTime.now();
    const sec = (date.hour*60*60)+(date.minute*60);
    let peri = msg.content.substring(10);
    let per;
    if(peri!="" && Number(peri)!=NaN && peri>0 && peri<6)
    per = Number(peri)-1;
    else
    per = period(sec);
    const quote = await valo("https://api.quotable.io/random");
    msg.channel.send(quote.content + "\nAuthor: " + quote.author);
    let a = tbem(per)
    const row = new MessageActionRow()
		.addComponents(
        new MessageButton()
            .setCustomId('perprev')
            .setEmoji(":arrowleft:912351000898203658")
		    .setStyle('PRIMARY'),
        new MessageButton()
			.setCustomId('pernext')
            .setEmoji(":arrowright:912350125349826570")
			.setStyle('PRIMARY'),
			);
    if(per == 0){
      row.components[0].setDisabled();
    }
    if(per == 4){
      row.components[1].setDisabled();
    }
    if(per>4){
      row.components.forEach(e=> e.setDisabled());
    }
    msg.channel.send({ embeds: [a], components: [row] })
    .then(msg =>{
      const filter = i => i.customId === 'perprev' || i.customId == "pernext";
      const collector = msg.createMessageComponentCollector({filter, time: 30000});
      collector.on("collect", async i =>{
        if(i.customId == 'perprev'){
          if(per!=0){
          per--;
          row.components[1].setDisabled(false);
          const e = tbem(per);
          if(per == 0){
            row.components[0].setDisabled();
            i.update({components:[row], embeds:[e]});
          }
          else i.update({embeds:[e], components:[row]})
          }
        }
        if(i.customId == 'pernext'){
          if(per!=4){
          per++;
          row.components[0].setDisabled(false);
          const e = tbem(per);
          if(per == 4){
            row.components[1].setDisabled();
            i.update({components:[row], embeds:[e]});
          }
          else i.update({embeds:[e], components:[row]})
          }
        }
      })
       collector.on("end",() => {
        row.components.forEach(e=> e.setDisabled());
        if(msg.editable)
        msg.edit({components:[row]})
       })
    })
    }
}

function period(time){
    const ti=[28800,34200,36600,39600,42600,45600];
    if(time>=ti[0] && time<=ti[1])
    return 0;
    if(time>=ti[1] && time<=ti[2])
    return 1;
    if(time>=ti[2] && time<=ti[3])
    return 2;
    if(time>=ti[3] && time<=ti[4])
    return 3;
    if(time>=ti[4] && time<=ti[5])
    return 4;
    if(time>=ti[5] || time<=ti[0])
    return 5;
}

function tbem(period){
    sub = subject(period);
    return new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("TimeTable")
        .addFields(
          { name: "Subject", value: sub[0] },
          { name: "Teacher", value: sub[1] },
          { name: "Period", value: String(period + 1) },
          { name: "Day", value: DateTime.now().weekdayLong }
        );
  }
  

function subject(period){
    const sub1 = ["English","Maths/Biology/Economics","Chemistry/Commerce","Computer/Maths/PE","Physics/Accountancy","Class over"];
    const sub2 = ["Maths/Biology/Accountancy","Physics/Commerce","Computer/Maths/PE","English","Chemistry/Economics","Class over"];
    const sub3 = ["Computer/Maths/PE","Maths/Biology/Accountancy","Chemistry/Economics","Physics/Commerce","English","Class over"];
    const sub4 = ["Chemistry/Economics","English","Maths/Biology/Accountancy","Physics/Commerce","Computer/Maths/PE","Class over"];
    const sub5 = ["Maths/Biology/Commerce","Chemistry/Economics","Computer/Maths/PE","English","Physics/Accountancy","Class over"];
  
    const teach1 = ["Lakshmi", "Sherly/Jit/Lilu", "Dhanya/Nirmala", "Akshara/Sherly/Evelin", "Cherian/Novella", "Enjoy"];
    const teach2 = ["Bini/Jyothi/Novella", "Gayathri/Nirmala", "Akshara/Bini/Evelin", "Imma", "Sruthi/Lilu", "Enjoy"];
    const teach3 = ["Akshara/Sherly/Evelin", "Sherly/Jit/Novella", "Dhanya/Lilu", "Cherian/Nirmala", "Lakshmi", "Enjoy"];
    const teach4 = ["Sruthi/Lilu", "Imma", "Bini/Jyothi/Novella", "Gayathri/Nirmala", "Akshara/Bini/Evelin", "Enjoy"];
    const teach5 = ["Sherly/Jit/Nirmala", "Dhanya/Lilu", "Akshara/Sherly/Evelin", "Lakshmi", "Cherian/Novella", "Enjoy"];

    const week = DateTime.now().weekday;
    let arr=[];
    switch(week){
     case 1:{
        arr[0]=sub1[period];
        arr[1]=teach1[period];
        return arr;
        break;
     }
     case 2:{
        arr[0]=sub2[period];
        arr[1]=teach2[period];
        return arr;
        break;
     }
     case 3:{
        arr[0]=sub3[period];
        arr[1]=teach3[period];
        return arr;
        break;
     }
     case 4:{
        arr[0]=sub4[period];
        arr[1]=teach4[period];
        return arr;
        break;
     }
     case 5:{
        arr[0]=sub5[period];
        arr[1]=teach5[period];
        return arr;
        break;
     }
     case 6:{
         arr[0]="Saturday no class ";
         arr[1]="LoL no";
         return arr;
         break;
     }
     case 7:{
        arr[0]="Sunday no class ";
        arr[1]="LoL no";
        return arr;
        break;
     }
     default:{
         arr[0]="Error fetching timetale";
         arr[1]="Error fetching timetale";
         return arr;
         break;
     }
    }
}
