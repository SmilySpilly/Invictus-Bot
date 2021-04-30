const discord = require("discord.js")
const User = require("../database/models/user");
const Warnings = require("../database/models/warnings");
const config = require("../config.json")

const warnDBFunction = (bot, message, args) => {
    if(message.member.roles._roles.has(config.staff) === true) {
        const member = message.mentions.members.first()
        let reason = message.content

        if(!member || !reason){
             message.reply('Please use the right syntax: **/warn <user> <reason>**')
        } else {
            var newWarn = new Warnings({
                user: member,
                reason,
            })

            newWarn.save().then(
                Warnings.find({user:member, reason: {$ne: "Racist Words"}}, (req,res) =>{ 
                    message.channel.send({embed: {
                        color: "11C26D",
                        description: `:warning: **${member}** has been warned!
                        
                                      User has total of **${res.length + 1}** warnings!`
                    }});
                })
            )
        }
    } else {
        message.channel.send({embed: {
            color: "FF4C52",
            description: "You are not allowed to perform this command."
        } });
    }
}

const dbFunction = (bot, message, args) => {
        if(message.member.roles._roles.has(config.staff) === true) {
            const member = message.mentions.members.first()
            var str = message.content
            str = str.substring(args[0].length + 6)
            const reason = str
             
            if(!member || !reason){
                if(!reason){
                    message.reply('Please use the right syntax: **/ban <user> <reason>**')
                } else {
                    message.reply("User doesn't exist")
                }
            } else {
                member.ban({
                    reason: reason
                });
                message.channel.send({embed: {
                    color: "11C26D",
                    description: `:wave: **${member.user.username + "#" + member.user.discriminator}** has been banned for the server!`
                }});

                bot.channels.cache.get('832479391778078750').send({embed: {
                    color: "F4B439",
                    description: `**${member.user.username + "#" + member.user.discriminator}** has been banned for the server!
                    
                    **Reason:** ${reason}
                    **By**: ${message.member}`
                  } });
            }
        } else {
            message.channel.send({embed: {
                color: "FF4C52",
                description: "You are not allowed to perform this command."
            } });
        }
}

const unbanDBFunction = (bot, message, args) => {
    if(message.member.roles._roles.has(config.staff) === true) {
        const member = args[0]
        if(!member){
             message.reply('Please use the right syntax: **/ban <user-id>**')
        } else {
            message.guild.members.unban(member)
            message.channel.send({embed: {
                color: "11C26D",
                description: `:white_check_mark: **${member}** has been unbanned for the server!`
            }});
            bot.channels.cache.get('832479391778078750').send({embed: {
                color: "F4B439",
                description: `:white_check_mark: **${member}** has been unbanned for the server!
                
                **By**: ${message.member}`
              } });
        }
    } else {
        message.channel.send({embed: {
            color: "FF4C52",
            description: "You are not allowed to perform this command."
        } });
    }
}

const muteDBFunction = (bot, message, args) => {
    if(message.member.roles._roles.has(config.staff) === true) {
        const member = message.mentions.members.first()
        const length = args[1]
        
        if(!member || !length){
             message.reply('Please use the right syntax: **/mute <user> <length in seconds>**')
        } else {
            if(member.roles._roles.has(config.muted)){
                message.channel.send({embed: {
                    color: "FF4C52",
                    description: `${member} is already **Muted.**`
                } });
            } else {
                if(isNaN(length)){
                    message.reply('Mute length must be in numbers.')
                } else {
                    if(length < 0) { 
                        message.reply('Mute length must be over **15 mintues (900 seconds)**')
                    } else {
                        member.roles.add(config.muted)
                        message.channel.send({embed: {
                            color: "11C26D",
                            description: `:white_check_mark: **${member}** has been muted for ${(length/60).toFixed(2)} Minutes!`
                        }});
                        bot.channels.cache.get('832479391778078750').send({embed: {
                            color: "F4B439",
                            description: 
                            `:white_check_mark: **${member}** has been muted!
                            
                            **By**: ${message.member}
                            **Length**: ${(length/60).toFixed(2)} Minutes`
                            
                          } });

                        setTimeout(() => {
                            member.roles.remove(config.muted)

                            bot.channels.cache.get('832479391778078750').send({embed: {
                                color: "F4B439",
                                description: 
                                `:white_check_mark: **${member}** has been **UnMuted** by The Bot`
                                
                              } });
                        }, length * 1000);
                    }
                }
            }
        }
    } else {
        message.channel.send({embed: {
            color: "FF4C52",
            description: "You are not allowed to perform this command."
        } });
    }
}

const unmuteDBFunction = (bot, message, args) => {
    if(message.member.roles._roles.has(config.staff) === true) {
        const member = message.mentions.members.first()
        
        if(!member){
             message.reply('Please use the right syntax: **/unmute <user>**')
        } else {
            if(member.roles._roles.has(config.muted) === false){
                message.channel.send({embed: {
                    color: "FF4C52",
                    description: `${member} is not **Muted**`
                } });
            } else {
                member.roles.remove(config.muted)
                message.channel.send({embed: {
                    color: "11C26D",
                    description: `:white_check_mark: **${member}** has been **UnMuted** by ${message.member}`
                }});
                
                bot.channels.cache.get('832479391778078750').send({embed: {
                    color: "F4B439",
                    description: 
                    `:white_check_mark: **${member}** has been **UnMuted** by ${message.member}`
                    
                  } });
            }
        }
    } else {
        message.channel.send({embed: {
            color: "FF4C52",
            description: "You are not allowed to perform this command."
        } });
    }
}

const kickDBFunction = (bot, message, args) => {
    if(message.member.roles._roles.has(config.staff) === true) {
        const member = message.mentions.members.first()
        var str = message.content
        str = str.substring(args[0].length + 6)
        const reason = str
        if(!member || !reason){
            if(!reason){
                message.reply('Please use the right syntax: **/ban <user> <reason>**')
            } else {
                message.reply("User doesn't exist")
            }
        } else {
            member.kick()
            message.channel.send({embed: {
                color: "11C26D",
                description: `:wave: **${member.user.username + "#" + member.user.discriminator}** has been kicked for the server!
                                
                              By ${message.member}`
            }});

            bot.channels.cache.get('832479391778078750').send({embed: {
                color: "F4B439",
                description: `
                **${member.user.username + "#" + member.user.discriminator}** has been kicked for the server!
                
                **By:** ${message.member}
                `
              } });
        }
    } else {
        message.channel.send({embed: {
            color: "FF4C52",
            description: "You are not allowed to perform this command."
        } });
    }
}

module.exports = {dbFunction, unbanDBFunction, muteDBFunction, warnDBFunction, unmuteDBFunction, kickDBFunction}