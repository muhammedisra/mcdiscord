const Valorant = require('@liamcottle/valorant.js');
const axios = require('axios');
const cron = require('cron');
const createCollage = require("@settlin/collage");
const valorantApi = new Valorant.API(Valorant.Regions.AsiaPacific);

module.exports = bot =>{
    bot.on("interactionCreate",async interaction =>{
        if(interaction.isCommand){
          if(interaction.commandName == 'valorantstore'){
          await interaction.deferReply();
          try{
          let sk = await store(interaction.options._hoistedOptions[0].value,interaction.options._hoistedOptions[1].value);
          await interaction.editReply({content:sk[0],files:[sk[1]]});
          }catch(err){
            interaction.editReply("Some error happened");
          }
        }}
      })


const store = async (username,password)=>{
    let skins = "";
    let i = 0;
    let pic = [];
      try {
            await valorantApi.authorize(username, password);
            const response = await valorantApi.getPlayerStoreFront(valorantApi.user_id);
            // console.log(response.data.SkinsPanelLayout.SingleItemOffers[0]);
             for(let skin of response.data.SkinsPanelLayout.SingleItemOffers){
              let skinss = await valo("https://valorant-api.com/v1/weapons/skinlevels/"+skin);
              skins = skins + skinss.data.displayName+ "    ";
              pic[i]=skinss.data.displayIcon;
              i++
            //  console.log(skins);
             }
             const collage = await st(pic);
             return [skins,collage];
      } catch (error) {
        console.log(error)
        return "Some Error occured","https://isra7766.xyz?Levi.png"
      }
    };
    
    let src;
  async function st(pic){
  try{
  const options = {
  sources: pic,
  width: 2, // number of images per row
  height: 2, // number of images per column
  imageWidth: 2550, // width of each image
  imageHeight: 750, // height of each image
  backgroundColor: "#000000", // optional, defaults to #eeeeee.
  spacing: 50
};

let canvas = await createCollage(options)
  
      src = canvas.jpegStream();
      return src
  } catch(err){
  return "https://isra7766.xyz/Levi.png"
}
}

    const valo = async (url) => {
      try {
        var format;
        await axios.get(url).then((response) => {
          format = response.data;
        });
        return format;
      } catch (error) {}
    };



    const job = cron.job("0 6 * * *",function(){
      dmstore(process.env.username,process.env.password);
    },null,true,"Asia/Kolkata");
    
    
    
     async function dmstore(username, password){
       try{
         
      const a = await store(username,password);
      bot.users.fetch("711077815784570952").then(e=>e.send({content:a[0],files:[a[1]]}));
      bot.users.fetch("671012726192996352").then(e=>e.send({content:a[0],files:[a[1]]}));
       }catch(err){
         console.log(err)
         console.log("Some Error Occured")
       }
    }}