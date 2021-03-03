require('dotenv').config()
var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

const Discord = require('discord.js')
const client = new Discord.Client({
    partials: ["MESSAGE"]
})

const BOT_PREFIX = '!'
const MOD_ME_COMMAND = 'mod'

client.on('ready', () => {
    console.log('Our bot is ready to go!!!')
})

client.on("messageDelete", msg => {
    msg.channel.send("Stop deleting messages")
})

client.on('message', msg => {
    if (msg.content === '!ping') {
        msg.channel.send('Pong!')
    }
    if (msg.content === "!stream") {
        msg.channel.send("https://www.youtube.com/channel/UCBo-c73ByXx8vG3CEBHjsrQ/live")
    }
    if (msg.content === "!schedule") {
        msg.channel.send("3/3 @ 8PM EST - Scales Live hosted by Colin \n 3/5 @ 8PM EST - Scales Hangout in Discord hosted by Mark \n 3/8 @ 8PM EST - Scales Live")
    }
    else if (msg.content == "I love Scales") {
        msg.react('❤')
    }
    else if (msg.content === `${BOT_PREFIX}${MOD_ME_COMMAND}`) {
        modUser(msg.member)
    }
})

function modUser(member) {
    member.roles.add("812775078357630977")
}

client.login(process.env.BOT_TOKEN) 