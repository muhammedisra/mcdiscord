const Valorant = require('@liamcottle/valorant.js');
const { default: axios } = require('axios');
const valorantApi = new Valorant.API(Valorant.Regions.AsiaPacific);

module.exports = bot =>{
    bot.on("interactionCreate",async interaction =>{
        if(interaction.isApplicationCommand){
          if(interaction.commandName == 'valorantstore'){
          await interaction.deferReply();
          let sk = await store(interaction.options._hoistedOptions[0].value,interaction.options._hoistedOptions[1].value);
          await interaction.editReply(sk);
        }}
      })
}

const store = async (username,password)=>{
    let skins = "";
      try {
            await valorantApi.authorize(username, password);
            const response = await valorantApi.getPlayerStoreFront(valorantApi.user_id);
            // console.log(response.data.SkinsPanelLayout.SingleItemOffers[0]);
             for(let skin of response.data.SkinsPanelLayout.SingleItemOffers){
              let skinss = await valo("https://valorant-api.com/v1/weapons/skinlevels/"+skin);
              skins = skins + skinss.data.displayName+ "\n";
            //  console.log(skins);
             }
            
             return skins;
      } catch (error) {
        return "Some Error occured"
      }
    };
    
    const valo = async (url) => {
      try {
        var format;
        await axios.get(url).then((response) => {
          format = response.data;
        });
        return format;
      } catch (error) {}
    };