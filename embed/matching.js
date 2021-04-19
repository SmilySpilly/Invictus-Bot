const discord = require("discord.js")
const User = require("../database/models/user");
const Clans = require("../database/models/clan");
const Requests = require("../database/models/requests");
const config = require("../config.json")

const dbFunction = (user, bot, message, args,) => {
    if(message.channel.id === config.scrimChannel){
        if(args.length == 4) {
            if(message.member.roles._roles.has(config.scrimrole) === true){ 
                var p1 = args[0];
                var p2 = args[2];
                p1 = p1.replace(/[^a-z\d\s]+/gi, "")
                p2 = p2.replace(/[^a-z\d\s]+/gi, "")
                
                var player2 = p1 == user ? p2 : p1

                User.find({user: user}, (req,res)=> {
                    User.find({user: player2}, (req,res2)=> {
                        if(res.length > 0 && res2.length > 0) {
                            Requests.find({player1: user, player2: player2, active: true}, (req,requestRes) => {
                                if(requestRes.length === 0){
                                    const newRequest = new Requests({
                                        player1: user,
                                        player2: player2,
                                        type: "Individual",
                                    })
                                    newRequest.save()

                                    bot.channels.cache.get('828658855457062982').send({embed: {
                                        color: "F4B439",
                                        title: "New Match Request",
                                        description: `**${args[0]}** vs **${args[2]}** \r\n **Score:** ${args[3]}`
                                    } });

                                    message.channel.send({embed: {
                                        color: "11C26D",
                                        fields: [{
                                            name: `You have Submitted the match Successfully!`,
                                            value: `${args[0] + " " + args[1] + " " + args[2]  + " " +  args[3] }`
                                        },]
                                    }});
                                } else {
                                    message.channel.send({embed: {
                                        color: "FF4C52",
                                        description: "You have already Submitted this match, please wait for a staff member to review it!"
                                    } });
                                }
                            })
                        } else {
                            message.channel.send({embed: {
                                color: "FF4C52",
                                description: "Please make sure both players are signed up!"
                            } });
                        }
                    })
                })
            } else {
                message.channel.send({embed: {
                    color: "FF4C52",
                    description: "You don't have permissions to apply this command!"
                } });
            }
        } else {
            message.channel.send({embed: {
                color: "FF4C52",
                description: "Please use the correct format, type /help scrim!"
            } });
        }
    }
}


const winDBFunction = (user, bot, message, args,) => {
    if(message.channel.id === config.staffChannel){
        if(args.length == 1) {
                var p1 = args[0];
                p1 = p1.replace(/[^a-z\d\s]+/gi, "")

                Requests.find({ $or: [{ 'player1': p1 },{ 'player2': p1 }], active: true}, (req,res) => {
                    if(res.length > 0){
                        var p2 = res[0].player1 == args[0] ? res[0].player1 : res[0].player2 ;
                        if(res[0].type == "Clans"){
                            Clans.find({roleID: p1 }, (req,clanRes1) => {
                                var clanElo = clanRes1[0].losses === 0 ? clanRes1[0].wins + 1 : clanRes1[0].wins / clanRes1[0].losses
                                var clanElo = isNaN(clanElo) ? 0 : clanElo

                                message.guild.roles.cache.find(role => role.id === clanRes1[0].roleID).edit({
                                    name: `${clanRes1[0].name} (${clanRes1[0].wins + 1}-${clanRes1[0].losses})`
                                })

                                Clans.updateOne({_id: clanRes1[0]._id}, {$inc: {wins: 1}, elo: clanElo}, (updateReq, updateRes) => {      
                                })
                            })
                            Clans.find({roleID: p2 }, (req,clanRes2) => {
                                var clanElo = (clanRes2[0].losses + 1) === 0 ? clanRes2[0].wins : clanRes2[0].wins / clanRes2[0].losses
                                var clanElo = isNaN(clanElo) ? 0 : clanElo

                                message.guild.roles.cache.find(role => role.id === clanRes2[0].roleID).edit({
                                    name: `${clanRes2[0].name} (${clanRes2[0].wins}-${clanRes2[0].losses + 1})`
                                })

                                Clans.updateOne({_id: clanRes2[0]._id}, {$inc: {losses: 1}, elo: clanElo}, (updateReq, updateRes) => {
                                })   
                            })

                            Requests.updateOne({_id: res[0]._id}, {active: false},  (updateReq, updateRes) => {
                            })     
                            message.channel.send({embed: {
                                color: "11C26D",
                                fields: [{
                                    name: `You have Submitted the Winner of the match!`,
                                    value: `**Winner:** ${args[0]}`
                                },]
                            }});
                        } else {
                            User.find({user: p1}, (req,playerResult1)=> {
                                var clanElo = playerResult1[0].losses === 0 ? playerResult1[0].wins + 1 : playerResult1[0].wins / playerResult2[0].losses
                                var clanElo = isNaN(clanElo) ? 0 : clanElo

                                User.updateOne({user: p1}, {$inc: {wins: 1}, elo: clanElo }, (updateReq, updateRes) => {
                                    console.log(updateRes)
                                })
                            })
                            User.find({user: p2}, (req,playerResult2)=> {
                                var clanElo = (playerResult2[0].losses + 1) === 0 ? playerResult2[0].wins : playerResult2[0].wins / playerResult2[0].losses
                                var clanElo = isNaN(clanElo) ? 0 : clanElo
                            
                                User.updateOne({user: p2}, {$inc: {losses: 1}, elo: clanElo }, (updateReq, updateRes) => {
                                    console.log(updateRes)
                                })
                            })
                            Requests.updateOne({_id: res[0]._id}, {active: false},  (updateReq, updateRes) => {
                            })

                            message.channel.send({embed: {
                                color: "11C26D",
                                fields: [{
                                    name: `You have Submitted the Winner of the match!`,
                                    value: `**Winner:** ${args[0]}`
                                },]
                            }});
                        }
                    } else {
                        message.channel.send({embed: {
                            color: "FF4C52",
                            fields: [{
                                name: `Error | Unknown Request`,
                                value: `No match has been submitted with these players!`
                            },]
                        }});
                    }
                })
         }
    }
}

const clanmatch =  (bot, message, args,) => {
    if(message.channel.id === config.scrimChannel){
        if(args.length == 4) {
            if(message.member.roles._roles.has(config.clanLeaderRole) === true || message.member.roles._roles.has(config.clanOfficerRole) === true){ 
                var p1 = args[0];
                var p2 = args[2];
                p1 = p1.replace(/[^a-z\d\s]+/gi, "")
                p2 = p2.replace(/[^a-z\d\s]+/gi, "")

                Clans.find({roleID: p1}, (req,clan1Res) => {
                    if(clan1Res.length > 0){
                        Clans.find({roleID: p2}, (req,clan2Res) => {
                            if(clan2Res.length > 0){

                                Requests.find({player1: p1, player2: p2, active: true, type: "Clans"}, (req,requestRes) => {
                                    if(requestRes.length === 0){
                                        const newRequest = new Requests({
                                            player1: p1,
                                            player2: p2,
                                            type: "Clans",
                                        })
                                        newRequest.save()
        
                                        bot.channels.cache.get('828658855457062982').send({embed: {
                                            color: "F4B439",
                                            title: "New Match Request",
                                            description: `**${args[0]}** vs **${args[2]}** \r\n **Score:** ${args[3]}`
                                        } });
        
                                        message.channel.send({embed: {
                                            color: "11C26D",
                                            fields: [{
                                                name: `You have Submitted the match Successfully!`,
                                                value: `${args[0] + " " + args[1] + " " + args[2]  + " " +  args[3] }`
                                            },]
                                        }});
                                    } else {
                                        message.channel.send({embed: {
                                            color: "FF4C52",
                                            description: "You have already Submitted this match, please wait for a staff member to review it!"
                                        } });
                                    }
                                })

                            } else {
                                message.channel.send({embed: {
                                    color: "FF4C52",
                                    description: `${args[2]} doesn't exist! **/help clan**`
                                }});
                            }
                        })
        
                    } else {
                        message.channel.send({embed: {
                            color: "FF4C52",
                            description: `${args[0]} doesn't exist! **/help clan**`
                        }});
                    }
                })

            } else {
                message.channel.send({embed: {
                    color: "FF4C52",
                    description: "**Only clan leaders can submit clan matches!**"
                }});
            }
        } else {
            message.channel.send({embed: {
                color: "FF4C52",
                description: "Invalid Format! **/help clan**"
            }});
        }
    }
}

module.exports = {dbFunction, winDBFunction, clanmatch}