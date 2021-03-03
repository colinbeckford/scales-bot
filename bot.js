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