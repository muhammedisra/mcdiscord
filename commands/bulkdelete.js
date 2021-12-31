module.exports = {
    name: "bulkdelete",
    async execute(msg){
        var mm = msg.content.split(" ");
        if (!(msg.author.id == "711077815784570952" || msg.author.id == "671012726192996352" || msg.author.id == "724668146614665359"))
        msg.channel.send("Sorry you do not have permission for this action");
        else if(mm[1]>100)
        msg.channel.send("Argument must be less than 100");
        else{
        if(!Number(mm[1]))
        msg.channel.send("Invalid Argument");
        else
        msg.channel.bulkDelete(mm[1]);
        }
    }
}