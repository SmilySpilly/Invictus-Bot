const discord = require("discord.js")
const User = require("../database/models/user");
const Clans = require("../database/models/clan");
const Requests = require("../database/models/requests");
const config = require("../config.json")

const dbFunction = (user, bot, message, args,) => {
    if(message.channel.id === config.commandsChannel){
        if(args.length == 1) {
            if(message.member.roles._roles.has(config.clanLeaderRole) === true){
                User.find({user: user}, (request,userRes) => {
                    if(userRes.length > 0) {

                    Clans.find({ $or: [{ leader: user },{ name : args[0] }]}, (req,res) => {
                        if(res.length === 0){
                            message.guild.roles.create({
                                data: {
                                name: args[0] + " (0-0)",
                                color: 'GRAY',
                                },
                                reason: 'New Clan',
                            }).then((r) => {
                                message.member.roles.add(r.id)
                        
                                const createClan = new Clans({ // CREATE NEW CLAN
                                    name: args[0],
                                    leader: user,
                                    officers: [],
                                    members: [],
                                    wins: 0,
                                    losses: 0,
                                    roleID: r.id,
                                })
                                createClan.save()
                            })

                            User.updateOne({user: user}, {inClan: true}, (req,updateRes) => {})

                            message.channel.send({embed: {
                                color: "11C26D",
                                title: "Clan has been created Successfully!",
                                description:"You have recieved your clan rank, you can now start inviting players to your clan!"
                            }});

                        } else {
                            if(res[0].name == args[0]){
                                message.channel.send({embed: {
                                    color: "FF4C52",
                                    description: "There is already a clan with this name, please change the name and try again!"
                                }});
                            } else {
                                message.channel.send({embed: {
                                    color: "FF4C52",
                                    description: "You already **have** a clan!"
                                }});
                            }
                        }
                    })
                } else {
                    message.channel.send({embed: {
                        color: "FF4C52",
                        description: "Please make sure you are signed up! **/signup**"
                    }}); 
                }
                })
            } else {
                message.channel.send({embed: {
                    color: "FF4C52",
                    description: "You don't have permissions to do this command, please open #ticket for more information!"
                }});
            }
        }
    }
}

const colorDBFunction =  (user, bot, message, args,) => {
    if(message.channel.id === config.commandsChannel){
        if(args.length == 1) {
            if(message.member.roles._roles.has(config.clanLeaderRole) === true){
                Clans.find({leader: user}, (req,res) => {
                    if(res.length > 0) {

                        var color = args[0].toUpperCase()

                        message.guild.roles.cache.find(role => role.id === res[0].roleID).edit({
                            color: color
                        }).then(Clans.updateOne({leader: user}, {color: color}, (req,updateRes) => {}))

                        message.channel.send({embed: {
                            color: "11C26D",
                            title: "Color Changed Successfully!",
                            description: "If your color didn't change, then the color you've entered doesn't exist!"
                        }});
                    } else {
                        message.channel.send({embed: {
                            color: "FF4C52",
                            description: "You don't own a clan! **/help clans**"
                        }});
                    }
                })
            } else {
                message.channel.send({embed: {
                    color: "FF4C52",
                    description: "Only the **Clan leader** can change the color of the clan role!"
                }});
            }
        } else {
            message.channel.send({embed: {
                color: "FF4C52",
                description: "Wrong format, do /help clans for help!"
            }});
        }
    }
}

const inviteDBFunction =  (user, bot, message, args,) => {
    if(message.channel.id === config.commandsChannel){
        if(args.length == 1) {
            if(message.member.roles._roles.has(config.clanLeaderRole) === true){
                Clans.find({leader: user}, (req,res) => {
                    if(res.length > 0) {
                        var p1 = args[0];
                        p1 = p1.replace(/[^a-z\d\s]+/gi, "")

                        User.find({user: p1}, (req,userRes) => {
                            if(userRes.length > 0){
                                if(userRes[0].inClan === false){
                                    Requests.find({player1: user, player2: p1, active: true, type: "Clan Invite"}, (req,requestRes) => {
                                        if(requestRes.length === 0){
                                            const newRequest = new Requests({
                                                player1: user,
                                                player2: p1,
                                                type: "Clan Invite"
                                            })
                                            
                                            newRequest.save()

                                            message.channel.send({embed: {
                                                color: "11C26D",
                                                description: `
                                                    **Clan invite to <@${p1}>**
                                                    You have Successfully sent a clan invite, please wait for the other user to accept

                                                    **How to accept?** Please type /clanaccept <@${user}>
                                                `
                                            }});
                                            
                                        } else {
                                            message.channel.send({embed: {
                                                color: "FF4C52",
                                                description: "You have already sent an invite to this player, please wait until they accept!"
                                            }});
                                        }
                                    })
                                } else {
                                    message.channel.send({embed: {
                                        color: "FF4C52",
                                        description: "User is already in a different clan!"
                                    }});
                                }
                            } else {
                                message.channel.send({embed: {
                                    color: "FF4C52",
                                    description: "User doesn't exist!"
                                }});
                            }
                        })
                    } else {
                        message.channel.send({embed: {
                            color: "FF4C52",
                            description: "You don't own a clan! **/help clans**"
                        }});
                    }
                })
            } else {
                message.channel.send({embed: {
                    color: "FF4C52",
                    description: "Only the **Clan leader** can change the color of the clan role!"
                }});
            }
        } else {
            message.channel.send({embed: {
                color: "FF4C52",
                description: "Wrong format, do /help clans for help!"
            }});
        }
    }
}

const acceptDBFunction = (user, bot, message, args,) => {
    if(message.channel.id === config.commandsChannel){
        if(args.length == 1) {
            var p1 = args[0];
            p1 = p1.replace(/[^a-z\d\s]+/gi, "")
            User.find({user: user}, (req,result) => {
                if(result.length > 0) {
                    if(result[0].inClan === false){
                        Requests.find({player1: p1, player2: user, type: "Clan Invite", active: true}, (req,res) => {
                            if(res.length > 0) {
                                Requests.updateOne({_id: res[0]._id}, {active: false}, (req,updateRes) => {})
                                User.updateOne({user: user}, {inClan: true}, (req,updateRes) => {})
                                Clans.updateOne({leader: p1}, {$push: {members: user}}, (req,updateRes) => {
                                    Clans.find({leader: p1}, (req, clanRes) => {
                                        message.member.roles.add(clanRes[0].roleID)

                                        message.channel.send({embed: {
                                            color: "11C26D",
                                            title: `You have Successfully joined ${clanRes[0].name}`,
                                            description: `You have received your role!`
                                        }});
                                    })
                                })

                            } else {
                                message.channel.send({embed: {
                                    color: "FF4C52",
                                    description: "You haven't been invited to join this clan!"
                                }});
                            }
                        })
                    } else {
                        message.channel.send({embed: {
                            color: "FF4C52",
                            description: "Please leave your currect clan in order to join this!"
                        }});
                    }
                } else {
                    message.channel.send({embed: {
                        color: "FF4C52",
                        description: "Please signup in order to use this command! **/signup**"
                    }});
                }
            })
        }
    }
}

const leaveDBFunction = (user, bot, message, args,) => {
    if(message.channel.id === config.commandsChannel){
        if(args.length == 1) {
            var roleid = args[0];
            roleid = roleid.replace(/[^a-z\d\s]+/gi, "")
            
            User.find({user: user}, (req,res) => {
                if(res.length > 0){
                    if(res[0].inClan === true) {
                        Clans.find({roleID: roleid}, (req,result) => {
                            if(result.length > 0) {
                                if(result[0].members.includes(user)){
                                    Clans.updateOne({_id: result._id}, {$pull: {members: user}}, (req,updateRes) => {})
                                    User.updateOne({user: user}, {inClan: false}, (req,updateRes) => {})

                                    // REMOVE CLAN RULE FROM USER
                                    message.member.roles.remove(result[0].roleID)

                                    message.channel.send({embed: {
                                        color: "11C26D",
                                        title: `You have Successfully leaved ${result[0].name}`,
                                        description: `Your role has been removed!`
                                    }});
                                } else if(result[0].officers.includes(user)) {
                                    Clans.updateOne({_id: result._id}, {$pull: {officers: user}}, (req,updateRes) => {})
                                    User.updateOne({user: user}, {inClan: false}, (req,updateRes) => {})
                                    message.member.roles.remove(config.clanOfficerRole)

                                    // REMOVE CLAN RULE FROM USER
                                    message.member.roles.remove(result[0].roleID)

                                    message.channel.send({embed: {
                                        color: "11C26D",
                                        title: `You have Successfully leaved ${result[0].name}`,
                                        description: `Your role has been removed!`
                                    }});

                                } else if (result[0].leader == user){
                                    message.channel.send({embed: {
                                        color: "FF4C52",
                                        description: "You can't leave a clan you own, please open a support ticket!"
                                    }});
                                } else {
                                    message.channel.send({embed: {
                                        color: "FF4C52",
                                        description: "You aren't a member of this clan!"
                                    }});
                                }
                            } else {
                                message.channel.send({embed: {
                                    color: "FF4C52",
                                    description: "This clan doesn't exist!"
                                }});
                            }
                        })
                    } else {
                        message.channel.send({embed: {
                            color: "FF4C52",
                            description: "You must be in a clan in order to use this command!"
                        }});
                    }
                } else {
                    message.channel.send({embed: {
                        color: "FF4C52",
                        description: "Please signup in order to use this command! **/signup**"
                    }});
                }
            })
        }
    }
}


const officerDBFunction = (user, bot, message, args,) => {
    if(message.channel.id === config.commandsChannel){
        if(args.length == 1) {
            if(message.member.roles._roles.has(config.clanLeaderRole) === true){
                var p1 = args[0];
                p1 = p1.replace(/[^a-z\d\s]+/gi, "")

                Clans.find({leader: user}, (req,res) => {
                    if(res.length > 0){
                        if(res[0].members.includes(p1)){
                            Clans.updateOne({leader:user}, {$pull: {members: p1}, $push:{officers: p1}}, (req,updateRes) => {})
                            message.member.roles.add(config.clanOfficerRole)

                            message.channel.send({embed: {
                                color: "11C26D",
                                title: "Promotion!",
                                description:"<@" + p1 + "> Has been promoted to officer!"
                            }});    
                        } else if(res[0].officers.includes(p1)) {
                            message.channel.send({embed: {
                                color: "FF4C52",
                                description: "This user is already an officer!"
                            }});
                        } else {
                            message.channel.send({embed: {
                                color: "FF4C52",
                                description: "User doesn't exist in your clan!"
                            }});
                        }
                    } else {
                        message.channel.send({embed: {
                            color: "FF4C52",
                            description: "You don't own a clan!"
                        }});
                    }
                })
            }
        } else {
            message.channel.send({embed: {
                color: "FF4C52",
                description: "Invalid Format! **/help clan**"
            }});
        }
    } 
}

const kickDBFunction = (user, bot, message, args,) => {
    if(message.channel.id === config.commandsChannel){
        if(args.length == 1) {
            if(message.member.roles._roles.has(config.clanLeaderRole) === true){
                var p1 = args[0];
                p1 = p1.replace(/[^a-z\d\s]+/gi, "")

                Clans.find({leader: user}, (req,res) => {
                    if(res.length > 0) {
                        if(res[0].members.includes(p1)){
                            Clans.updateOne({leader: user}, {$pull: {members: p1}}, (req,updateRes) => {})
                            User.updateOne({user: p1}, {inClan : false}, (req,updateRes) => {})
                            message.guild.members.cache.get(p1).roles.remove(res[0].roleID)

                            message.channel.send({embed: {
                                color: "11C26D",
                                description: "<@" + p1 + "> has been kicked from the clan!"
                            }});
                        } else if (res[0].officers.includes(p1)){
                            Clans.updateOne({leader: user}, {$pull: {officers: p1}}, (req,updateRes) => {})
                            User.updateOne({user: p1}, {inClan : false}, (req,updateRes) => {})
                            message.guild.members.cache.get(p1).roles.remove(res[0].roleID)
                            message.guild.members.cache.get(p1).roles.remove("833391813708087296")

                            message.channel.send({embed: {
                                color: "11C26D",
                                description: "<@" + p1 + "> has been kicked from the clan!"
                            }});
                        } else if (res[0].leader == p1) {
                            message.channel.send({embed: {
                                color: "FF4C52",
                                description: "You cannot kick yourself!"
                            }});
                        } else {
                            message.channel.send({embed: {
                                color: "FF4C52",
                                description: "User is not in your clan!"
                            }});
                        }
                    } else {
                        message.channel.send({embed: {
                            color: "FF4C52",
                            description: "You don't own a clan!"
                        }});
                    }
                })
            } 
        } else {
            message.channel.send({embed: {
                color: "FF4C52",
                description: "Invalid Format! **/help clan**"
            }});
        }
    } 
}

const infoDBFunction = (bot, message, args,) => {
    if(message.channel.id === config.commandsChannel){
        if(args.length == 1) { 
            var p1 = args[0];
            p1 = p1.replace(/[^a-z\d\s]+/gi, "")

            Clans.find({roleID: p1}, (req,res) => {
                if(res.length > 0) {

                    function members(){
                        var x = "";
                        var u = "";
                        for(var i = 0; i < res[0].members.length; i++) {
                            u = res[i].members
                            x += "<@" + u.toString() + ">"
                        }
                        if(x == ""){
                            return "-"
                        } else {
                            return x
                        }
                    }

                    function officers(){
                        var o = "";
                        var u = "";
                        for(var y = 0; y < res[0].officers.length; y++) {
                            u = res[y].officers
                            o += "<@" + u.toString() + ">"
                        }

                        if(o == ""){
                            return "-"
                        } else {
                            return o
                        }
                    }
        
                    message.channel.send({embed: {
                        color: "11C26D",
                        title: `${res[0].name}'s Info`,
                        description: `
                            **Name:** ${res[0].name}
                            **Color:** ${res[0].color}
                            **Members Count:** ${res[0].members.length + res[0].officers.length  + 1}

                            **Leader:** <@${res[0].leader}>
                            **Officers:** ${officers()}
                            **Members:** ${members()}

                            **Wins:** <@${res[0].wins}>
                            **Losses:** ${res[0].losses}
                            **Elo:** ${res[0].elo}
                        `
                    }});
                } else {
                    message.channel.send({embed: {
                        color: "FF4C52",
                        description: "Clan doesn't exist!"
                    }});
                }
            })
        } else {
            message.channel.send({embed: {
                color: "FF4C52",
                description: "Invalid Format! **/help clan**"
            }});
        }
    }
}

const stepsDBFunction = ( bot, message) => {
    message.channel.send({embed: {
        color: "FF4C52",
        title: "How to Setup your Clan" ,
        fields: [{
            name: "Step #1",
            value: "Take a screenshot showing us you have 8+ Members On Your Team"
          },
          {
            name: "Step #2",
            value: "Show us that you have been a group for at least 1 week."
          },
          {
            name: "Step #3",
            value: "Please link all DiscordID's"
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: "Invictus Scrims"
        }
    }});
}

module.exports = {dbFunction, colorDBFunction, inviteDBFunction, acceptDBFunction, leaveDBFunction, officerDBFunction, kickDBFunction, infoDBFunction, stepsDBFunction} 