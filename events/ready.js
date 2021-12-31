module.exports = bot =>{
    bot.on('ready', () =>{
        console.log('this bot is online');
        bot.user.setActivity('Theory of relativity', { type: 'STREAMING' , url: 'https://www.twitch.tv/isra77776666' });
     })
}