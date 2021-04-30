const discord = require("discord.js")
const mongoose = require("mongoose");
const db = require("./database/database");
const Warnings = require("./database/models/warnings");
const bot = new discord.Client({ 
  partials: [
    "MESSAGE", 
    "REACTION"
  ],
})
bot.commands = new discord.Collection();
const config = require("./config.json")

// DB CONNECT 
db.then(() => console.log("Connected to MongoDB.")).catch((err) =>
  console.log(err)
);

// On Message
bot.on("message", async (message) => {
    

    if(message.content[0] == config.prefix ){
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        embed = new discord.MessageEmbed()

        switch (commandName){        
          // Vote Command
          case "vote": 
            message.channel.send({embed: require("./embed/vote.js")(bot)});
            break;

          // signup Command
          case "signup": 
            require("./embed/signup.js").dbFunction(message.author.id, message.author.username + "#" + message.author.discriminator, bot, message)
            break;  

          // Help Command
          case "help": 
            if(!args[0] ){ message.channel.send({embed: require("./embed/help.js")(bot)});}
            if(args[0] == "general") {message.channel.send({embed: require("./embed/helpGeneral.js")(bot)});}
            if(args[0] == "scrim") {message.channel.send({embed: require("./embed/helpScrim.js")(bot)});}
            if(args[0] == "clan") {message.channel.send({embed: require("./embed/helpClan.js")(bot)});}
            if(args[0] == "staff") {message.channel.send({embed: require("./embed/helpStaff.js")(bot)});}
            break;

          // Elo Command
          case "elo": 
            require("./embed/elo.js").dbFunction(message.author.id, bot, message)
            break;  

          // MATCHING SYSTEM 
          case "match": // Player Submissions
            require("./embed/matching.js").dbFunction(message.author.id, bot, message, args,)
            break;  

          case "win": // Admin Review 
            require("./embed/matching.js").winDBFunction(message.author.id, bot, message, args,)
            break;    

          // Leaderboards Command
          case "leaderboards": 
            require("./embed/leaderboards.js").dbFunction(bot, message)
            break;
            
          case "scrimleaderboards": 
            require("./embed/leaderboards.js").clansdbFunction(bot, message)
            break;

            
          // CLANS Command
          case "clancreate": // Clan Create
            require("./embed/clans.js").dbFunction(message.author.id, bot, message, args)
            break;  

          case "clancolor": // Clan Change Role Color 
            require("./embed/clans.js").colorDBFunction(message.author.id, bot, message, args)
            break;   
          
          case "claninvite": // Clan Change Role Color 
            require("./embed/clans.js").inviteDBFunction(message.author.id, bot, message, args)
            break;  

          case "clanaccept": // Clan Change Role Color 
            require("./embed/clans.js").acceptDBFunction(message.author.id, bot, message, args)
            break;     

          case "clanleave": // Clan Change Role Color 
            require("./embed/clans.js").leaveDBFunction(message.author.id, bot, message, args)
            break;      

          case "clanofficer": // Clan Change Role Color 
            require("./embed/clans.js").officerDBFunction(message.author.id, bot, message, args)
            break;  
            
          case "clankick": // Clan Change Role Color 
            require("./embed/clans.js").kickDBFunction(message.author.id, bot, message, args)
            break;  

          case "claninfo": // Clan Change Role Color 
            require("./embed/clans.js").infoDBFunction(bot, message, args)
            break;  

          case "clansteps": // Clan Change Role Color 
            require("./embed/clans.js").stepsDBFunction(bot, message)
            break;   

          case "clanmatch": // Clan Change Role Color 
            require("./embed/matching.js").clanmatch(bot, message, args)
            break;    
            
          // MANAGEMENT COMMANDS 
          case "warn": // Clan Change Role Color 
            require("./embed/management.js").warnDBFunction(bot, message, args)
            break;    
          case "ban": // Clan Change Role Color 
            require("./embed/management.js").dbFunction(bot, message, args)
            break; 

          case "unban": // Clan Change Role Color 
            require("./embed/management.js").unbanDBFunction(bot, message, args)
            break; 

          case "mute": // Clan Change Role Color 
            require("./embed/management.js").muteDBFunction(bot, message, args)
            break;

          case "unmute": // Clan Change Role Color 
            require("./embed/management.js").unmuteDBFunction(bot, message, args)
            break;

          case "kick": // Clan Change Role Color 
            require("./embed/management.js").kickDBFunction(bot, message, args)
            break;   

          case "staffapp": // Link to staff applications
            message.channel.send({embed: require("./embed/staffapp.js")(bot)});
            break;
        }
    } else {
      // Mute advertiser
    if(message.content.includes('discord.gg/'||'discordapp.com/invite/'||"https://")) {
      if(message.member.roles._roles.has(config.staff) === false){
        message.delete()
        message.member.roles.add(config.muted)
        message.channel.send({embed: {
            color: "11C26D",
            description: `:white_check_mark: **${message.member}** Has been muted for 30 Minutes!
                                             **Reason:** Advertising`
        }});
        setTimeout(() => {
            message.member.roles.remove(config.muted)
        }, 18000 * 1000);

        bot.channels.cache.get('837320928354369556').send({embed: {
          color: "F4B439",
          description: `
          ${message.member} has been muted
          
          **By:** Auto Mute
          **Reason:** Advertising ${message.channel}
          `
      } });
      }
    }

    // Mute Racist words 
    var words = []
    if (words.some(function(v) { return message.content.indexOf(v) >= 0; })) {
      message.delete()
      var newWarn = new Warnings({
          user: message.member,
          reason: "Racist Words",
      })

      newWarn.save().then(
          Warnings.find({user:message.member, reason: "Racist Words"}, (req,res) =>{ 
              message.channel.send({embed: {
                  color: "11C26D",
                  description: `:warning: **${message.member}** Has been warned!
                  
                                User has total of **${res.length  + 1}** warnings!`
              }});

              if(res.length + 1 == 2){
                Warnings.deleteMany({user:message.member, reason: "Racist Words"}, (request, updateRes) => {
                  message.member.roles.add(config.muted)
                  message.channel.send({embed: {
                      color: "11C26D",
                      description: `:white_check_mark: **${message.member}** Has been muted for 30 Minutes!
                      
                                    **Reason:** Racist Words`
                  }});
                  setTimeout(() => {
                      message.member.roles.remove(config.muted)
                  }, 18000 * 1000);
                })

                bot.channels.cache.get('837320928354369556').send({embed: {
                  color: "F4B439",
                  description: `
                  ${message.member} has been muted
                  
                  **By:** Auto Mute
                  **Reason:** Racist Words in ${message.channel}
                  `
              } });
              }
          })
      )
    }
    }
})

// Auto Role
bot.on('guildMemberAdd', member => {
  var role = member.guild.roles.find('name', 'Member');
  member.addRole(role);
})

bot.on("ready", async () => console.log(`${bot.user.tag} is ready!`))

bot.login("Nzg4MDUzNjc5MjE5MDE1NzAw.X9d6Lg.efFJN1tObwQAVCiE5sQep9_n_po")
