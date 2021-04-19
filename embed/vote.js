const discord = require("discord.js")

module.exports = (bot) => voteEmbed = {
        color: 3447003,
        title: "Vote for the server!",
        url: "https://top.gg/servers/750133205230682193/vote",
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: "Invictus Scrims"
        }
    }