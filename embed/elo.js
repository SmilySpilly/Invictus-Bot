const discord = require("discord.js")
const User = require("../database/models/user");

const dbFunction = (user, bot, message) => {
    User.find({user: user}, (req,res)=> {
        if(res.length > 0) {
            message.channel.send({embed: {
                color: "11C26D",
                fields: [{
                    name: `${res[0].username}`,
                    value: `
                            **Wins:**    ${res[0].wins || 0} 
                            **Losses:**  ${res[0].losses || 0} 
                            **Elo:**     ${res[0].elo} \r\n
                            
                        `
                  },]
            }});
        } else {
            message.channel.send({embed: {
                color: "FF4C52",
                description: "Player not found, please use **/signup**!"
            } });
        }
    })
}

module.exports = {dbFunction}