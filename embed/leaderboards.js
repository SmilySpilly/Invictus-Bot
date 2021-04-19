const discord = require("discord.js")
const User = require("../database/models/user");
const Clans = require("../database/models/clan");
const config = require("../config.json")

const dbFunction = (bot, message) => {
  if(message.channel.id === config.leaderboardsChannel){
    User.find({}).sort({elo: -1}).exec((req,res) => {
            message.channel.send({embed: {
                color: "11C26D",
                description: "**Individual Leaderboards**",
                fields: [{
                    name: `Users`,
                    value: `
                            ━━━━━━━━━
                            ${(res[0] || {}).username || "-"} 
                            ${(res[1] || {}).username || "-"} 
                            ${(res[2] || {}).username || "-"} 
                            ${(res[3] || {}).username || "-"} 
                            ${(res[4] || {}).username || "-"} 
                            ${(res[5] || {}).username || "-"} 
                            ${(res[6] || {}).username || "-"} 
                            ${(res[7] || {}).username || "-"} 
                            ${(res[8] || {}).username || "-"} 
                            ${(res[9] || {}).username || "-"} 
                        `,
                    "inline": true
                  },{
                    name: `Wins `,
                    value: `
                    ━━━━━━━━━
                    ${(res[0] || {}).wins || "-"}
                    ${(res[1] || {}).wins || "-"} 
                    ${(res[2] || {}).wins || "-"} 
                    ${(res[3] || {}).wins || "-"}
                    ${(res[4] || {}).wins || "-"}
                    ${(res[5] || {}).wins || "-"}
                    ${(res[6] || {}).wins || "-"} 
                    ${(res[7] || {}).wins || "-"} 
                    ${(res[8] || {}).wins || "-"} 
                    ${(res[9] || {}).wins || "-"} 
                    `,
                    "inline": true
                  },
                  {
                    name: `Elo`,
                    value: `
                    ━━━━━━━━━
                    ${value = isNaN(((res[0] || {}).wins / ((res[0] || {}).losses || 1)).toFixed(2)) ? "-" : ((res[0] || {}).wins / ((res[0] || {}).losses || 1)).toFixed(2)} 
                    ${value = isNaN(((res[1] || {}).wins / ((res[1] || {}).losses || 1)).toFixed(2)) ? "-" : ((res[1] || {}).wins / ((res[1] || {}).losses || 1)).toFixed(2)} 
                    ${value = isNaN(((res[2] || {}).wins / ((res[2] || {}).losses || 1)).toFixed(2)) ? "-" : ((res[2] || {}).wins / ((res[2] || {}).losses || 1)).toFixed(2)} 
                    ${value = isNaN(((res[3] || {}).wins / ((res[3] || {}).losses || 1)).toFixed(2)) ? "-" : ((res[3] || {}).wins / ((res[3] || {}).losses || 1)).toFixed(2)} 
                    ${value = isNaN(((res[4] || {}).wins / ((res[4] || {}).losses || 1)).toFixed(2)) ? "-" : ((res[4] || {}).wins / ((res[4] || {}).losses || 1)).toFixed(2)} 
                    ${value = isNaN(((res[5] || {}).wins / ((res[5] || {}).losses || 1)).toFixed(2)) ? "-" : ((res[5] || {}).wins / ((res[5] || {}).losses || 1)).toFixed(2)} 
                    ${value = isNaN(((res[6] || {}).wins / ((res[6] || {}).losses || 1)).toFixed(2)) ? "-" : ((res[6] || {}).wins / ((res[6] || {}).losses || 1)).toFixed(2)} 
                    ${value = isNaN(((res[7] || {}).wins / ((res[7] || {}).losses || 1)).toFixed(2)) ? "-" : ((res[7] || {}).wins / ((res[7] || {}).losses || 1)).toFixed(2)} 
                    ${value = isNaN(((res[8] || {}).wins / ((res[8] || {}).losses || 1)).toFixed(2)) ? "-" : ((res[8] || {}).wins / ((res[8] || {}).losses || 1)).toFixed(2)} 
                    ${value = isNaN(((res[9] || {}).wins / ((res[9] || {}).losses || 1)).toFixed(2)) ? "-" : ((res[9] || {}).wins / ((res[9] || {}).losses || 1)).toFixed(2)} 
                    `,
                    "inline": true
                  },],
                  image: {
                    url: 'https://i.stack.imgur.com/Fzh0w.png'
                  },
                  timestamp: new Date(),
                  footer: {
                    icon_url: bot.user.avatarURL,
                    text: "Invictus Scrims"
                  }
            }});
    })
  }
}

const clansdbFunction = (bot, message) => {
  if(message.channel.id === config.leaderboardsChannel){
    Clans.find({}).sort({elo: -1}).exec((req,res) => {
            message.channel.send({embed: {
                color: "11C26D",
                description: "**Clans Leaderboards**",
                fields: [{
                    name: `Clan`,
                    value: `
                            ━━━━━━━━━
                          ** ${(res[0] || {}).name || "-"} **
                          ** ${(res[1] || {}).name || "-"}**
                          **${(res[2] || {}).name || "-"} **
                          **${(res[3] || {}).name || "-"} **
                          **${(res[4] || {}).name || "-"} **
                          **${(res[5] || {}).name || "-"} **
                          **${(res[6] || {}).name || "-"} **
                          **${(res[7] || {}).name || "-"} **
                          **${(res[8] || {}).name || "-"} **
                          **${(res[9] || {}).name || "-"} **
                        `,
                    "inline": true
                  },{
                    name: `Wins `,
                    value: `
                    ━━━━━━━━━
                    ${(res[0] || {}).wins || "-"}
                    ${(res[1] || {}).wins || "-"} 
                    ${(res[2] || {}).wins || "-"} 
                    ${(res[3] || {}).wins || "-"}
                    ${(res[4] || {}).wins || "-"}
                    ${(res[5] || {}).wins || "-"}
                    ${(res[6] || {}).wins || "-"} 
                    ${(res[7] || {}).wins || "-"} 
                    ${(res[8] || {}).wins || "-"} 
                    ${(res[9] || {}).wins || "-"} 
                    `,
                    "inline": true
                  },
                  {
                    name: `Losses`,
                    value: `
                    ━━━━━━━━━
                    ${(res[0] || {}).losses || "-"}
                    ${(res[1] || {}).losses || "-"} 
                    ${(res[2] || {}).losses || "-"} 
                    ${(res[3] || {}).losses || "-"}
                    ${(res[4] || {}).losses || "-"}
                    ${(res[5] || {}).losses || "-"}
                    ${(res[6] || {}).losses || "-"} 
                    ${(res[7] || {}).losses || "-"} 
                    ${(res[8] || {}).losses || "-"} 
                    ${(res[9] || {}).losses || "-"} 
                    `,
                    "inline": true
                  },],
                  image: {
                    url: 'https://i.stack.imgur.com/Fzh0w.png'
                  },
                  timestamp: new Date(),
                  footer: {
                    icon_url: bot.user.avatarURL,
                    text: "Invictus Scrims"
                  }
            }});
    })
  }
}

module.exports = {dbFunction, clansdbFunction}