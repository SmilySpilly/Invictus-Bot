const discord = require("discord.js")

module.exports = (bot) => voteEmbed = {
  color: "11C26D",
  title: "Help - Scrims",
  fields: [{
      name: "/match <@member>",
      value: "Submit a match between you and another user and/or clan for review."
    },
    {
      name: "/elo",
      value: "Show your individual elo"
    },
  ],
  timestamp: new Date(),
  footer: {
    icon_url: bot.user.avatarURL,
    text: "Invictus Scrims"
  }

}
    