// Require the necessary discord.js classes
//const fetch = require('node-fetch');
//const fs = require('node:fs');
const Discord = require('discord.js');
const { Intents } = require('discord.js');
const { token } = require('./config.json');
//const serverinfo = require('./commands/serverinfo');
//const { ServerResponse } = require('node:http');
//const { channel } = require('node:diagnostics_channel');


// Create a new client instance
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], intents:[Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
//const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handlers = ['command_handler', 'event_handler'];

for(const handler of handlers){

    require(`./handlers/${handler}`)(client, Discord);
}
//['command_handler', 'event_handler'].forEach(handler =>{
//	require(`./handlers/${handler}`);
//});


//--------------------------------------------------

//client.on('guildMemberAdd', guildMember =>{
//	const welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'citizens');
//	guildMember.roles.add(welcomeRole);
//  const channel = guildMember.guild.channels.cache.get('971480144747323404');
//    if (!channel) return;
//    channel.send('are u alyen'); 	
//});

//client.on('interactionCreate', async interaction => {
//	if (!interaction.isCommand()) return;
//	const command = client.commands.get(interaction.commandName);
//	if (!command) return;

//	try {
//		await command.execute(interaction);
//	} catch (error) {
//		console.error(error);
//		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//	}
//});


client.login(token);