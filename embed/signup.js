const discord = require("discord.js")
const User = require("../database/models/user");

const dbFunction = (user, username, bot, message) => {
    User.find({user: user}, (req,res)=> {
        if(res.length === 0) {
            const newUser = new User({
                user: user,
                username: username,
                wins: 0,
                losses: 0,
                elo: "0.00",
            })
            newUser.save()

            message.channel.send({embed: {
                color: "11C26D",
                title: "You have been Signed Up!",
                description: "You can now start matches and view your elo!",
            }});
        } else {
            message.channel.send({embed: {
                color: "FF4C52",
                description: "You have **already** Signed up!"
            } });
        }
    })
}

module.exports = {dbFunction}
