const axios = require("axios");
exports.valo = async (url) => {
    try {
        var format = "";
        await axios.get(url).then((response ) => {
            format = response.data;
        });
        return format;
    } catch(error){
        //console.log("NO user");
    }
}