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

client.on('message', message => {
	if (!message.content.startsWith(`${BOT_PREFIX}`) || message.author.bot) return;

    const args = message.content.slice(`${BOT_PREFIX}`.length).trim().split(' ');
    const command = args.shift().toLowerCase();
});

client.on("messageDelete", msg => {
    msg.channel.send("Stop deleting messages")
})

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Pong.');
	} else if (command === 'beep') {
		message.channel.send('Boop.');
	}
	// other commands...
});


function modUser(member) {
    member.roles.add("812775078357630977")
}

client.login(process.env.BOT_TOKEN)