require('dotenv').config()

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

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === '!stream') {
		message.channel.send('youtube.com/c/scalescollective/live');
	} else if (command === '!schedule') {
		message.channel.send('3/3 @ 8PM EST - Scales Live hosted by Colin \n 3/5 @ 8PM EST - Scales Hangout in Discord hosted by Mark \n 3/26-3/28 - Scales Open V');
	}

	// other commands...
});


function modUser(member) {
    member.roles.add("812775078357630977")
}

client.login(process.env.BOT_TOKEN)