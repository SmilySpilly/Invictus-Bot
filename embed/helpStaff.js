const discord = require("discord.js")

module.exports = (bot) => voteEmbed = {
  color: "11C26D",
  title: "Help - Staff",
  fields: [
    {
      name: "/ban @user <Reason>",
      value: "Ban user"
    },
    {
      name: "/unban @user ",
      value: "Unban user"
    },
    {
      name: "/mute @user <Time> <Reason>",
      value: "Mute user"
    },
    {
      name: "/unmute @user",
      value: "Unmute user"
    },
    {
      name: "/warn @user <Reason>",
      value: "Warn user"
    },
    {
      name: "/staffapp",
      value: "Link to staff applications form"
    },
  ],
  timestamp: new Date(),
  footer: {
    icon_url: bot.user.avatarURL,
    text: "Invictus Scrims"
  }

}
    