const discord = require("discord.js")

module.exports = (bot) => voteEmbed = {
  color: "11C26D",
  title: "Help - General",
  fields: [{
      name: "How to get Clan Leader",
      value: "Create a ticket in #ticket-create and ask for clan leader. You must have a proof that your clan has over 8 members total"
    },
    {
      name: "/clansteps <@member>",
      value: "A guide to setup your clan."
    },
    {
      name: "/clancreate <tag>",
      value: "Use this command once you create your clan's role. Replace 'tag' in the command with your clans tag."
    },
    {
      name: "/claninvite <@member>",
      value: "Use this command to invite players to your clan. If the bot does not respond, you did not do the command correctly, INVITING MEMBERS INSTANTLY GIVE THEM THE ROLE, ABUSE OF THIS WILL RESULT IN LOSS OF ROLE"
    },
    {
      name: "/clankick <@member>",
      value: "Use this command to kick players from your clan, If the bot doesn't respond, you did not do the command correctly"
    },
    {
      name: "/clanleave",
      value: "Use this command to leave a clan"
    },
    {
      name: "/claninfo",
      value: "this will list the info of the clan"
    },
    {
      name: "/clancolor <color-code>",
      value: "Use this command change your clan tag/role color."
    },
    {
      name: "/clanofficer <@member>",
      value: "This will give the member the clan officer role."
    },
    {
      name: "/clanmatch <@tag your clan> vs <@tag opposite clan> (score)",
      value: "Submit a new clan match."
    }
    
  ],
  timestamp: new Date(),
  footer: {
    icon_url: bot.user.avatarURL,
    text: "Invictus Scrims"
  }

}
    