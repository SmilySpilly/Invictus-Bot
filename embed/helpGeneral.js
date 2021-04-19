const discord = require("discord.js")

module.exports = (bot) => voteEmbed = {
  color: "11C26D",
  title: "Help - General",
  fields: [{
      name: "/help <module>",
      value: "Shows this help list"
    },
    {
      name: "/vote",
      value: "Vote for pic perms"
    },
    {
      name: "/stats <steamid>",
      value: "Shows rust stats"
    }
    
  ],
  timestamp: new Date(),
  footer: {
    icon_url: bot.user.avatarURL,
    text: "Invictus Scrims"
  }

}
    