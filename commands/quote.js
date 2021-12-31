const { valo } = require("./../api.js");
module.exports = {
    name: "quote",
    async execute(msg){
        let a = await  valo("https://api.quotable.io/random");
        msg.channel.send(a.content+"\nAuthor: "+a.author);
    }
}