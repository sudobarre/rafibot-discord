// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Collection, Intents, GuildMemberRoleManager } = require('discord.js');
const { token } = require('./config.json');
const { channel } = require('node:diagnostics_channel');

// Create a new client instance
const client = new Client({ intents : [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

//https://discordjs.guide/creating-your-bot/event-handling.html#reading-event-files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//add role and welcome message
client.on('guildMemberAdd', guildMember =>{
	const welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'citizens');
	guildMember.roles.add(welcomeRole);
    const channel = guildMember.guild.channels.cache.get('971480144747323404');
    if (!channel) return;
    channel.send('are u alyen'); 	
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return; //if it was by someone in specific then maybe return a message
    //could declare a map member:[array] of common catchphrases every member says and randomly chooses one of them when its invoked by a member belonging to that map
	
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('message', message =>{
	if (message.author.bot) return;
	//Fede B's id = '228837379165650946'
	//could declare an object with peoples names and id's and associate them to an array of common catchphrases
	if(message.author.id === '228837379165650946' || message.author.id === '389046536480227328' || message.author.id === '900735891448946698'){ //if its sima
		message.channel.send('die');
	}
});

client.login(token);