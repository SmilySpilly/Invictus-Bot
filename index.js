const discord = require("discord.js")
const mongoose = require("mongoose");
const db = require("./database/database");
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
        }
    }
})

bot.on("ready", async () => console.log(`${bot.user.tag} is ready!`))

bot.login("Your Bot Token")
