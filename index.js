// Require the necessary discord.js classes
const fetch = require('node-fetch');
const fs = require('node:fs');
const Discord = require('discord.js');
const { Intents } = require('discord.js');
const { token } = require('./config.json');
const serverinfo = require('./commands/serverinfo');
const { ServerResponse } = require('node:http');
//const { channel } = require('node:diagnostics_channel');
const prefix = '-';

const sadWords=['sad', 'depressed', 'unhappy', 'angry'];




// Create a new client instance
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], intents:[Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Discord.Collection();

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

const simaCatch = ['DIE', 'die', 'ugh', 'booo', 'jump off a bridge', 'break your fingers', 'sabir', 'this mf', 'changes profile pic every 5 minutes'];
const aysanCatch = ['pat pat', 'aww', 'bush', 'm!p tamino habibi', 'hey guys i just invited this dude that i talked to just once he seems nice and totally not homophobe hihi', 'cooooool', 'today i will study', 'pija', 'your lips my lips apocalypse'];
const ardCatch = ['game?', 'hello', 'hi', 'i just watched this new anime that totally looks like hentai but its not i swear', 'that fucking racoon', 'fucking winklit'];
const mayerCatch = ['m!p computer blue', 'who the fuck is bb king', 'idk lmao he never talks'];
const funCatch = ['ZzzZZzZzzZzZzz...'];
const narratorCatch = ['gimme coins pls'];
const ryanCatch = ['^^roulette wife for the day', 'interesting'];

const guild = client.guilds.fetch('915210119904657428');
const members = guild.members.fetch(); // returns Collection
const catchphrases = new Map();
for(member in members){
	catchphrases.set(member.Id, ['who dat lol']);
}



//add role and welcome message
client.on('guildMemberAdd', guildMember =>{
	const welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'citizens');
	guildMember.roles.add(welcomeRole);
    const channel = guildMember.guild.channels.cache.get('971480144747323404');
    if (!channel) return;
    channel.send('are u alyen'); 	
});


client.on('message', message =>{
	if (message.author.bot) return;
	//Fede B's id = '228837379165650946'
	//could declare an object with peoples names and id's and associate them to an array of common catchphrases
	if(!message.content.startsWith(prefix)){
		if(message.author.id === '228837379165650946' || message.author.id === '389046536480227328' || message.author.id === '900735891448946698'){ //if its sima
		message.channel.send('die');
		}else{
			return;
		}
	}

	function getQuote(){
		return fetch('https://zenquotes.io/api/random')
		.then(res => {
			return res.json();
		})
		.then(data => {
			return data[0]['q'] + ' -' + data[0]['a'];
		});
	}
	
	if(message.content === '-inspire'){ //send it via DM to users
		getQuote().then(quote => message.channel.send(quote));
	}

	if(sadWords.some(word=>message.content.includes(word))){
		getQuote().then(quote => message.reply(quote));
	}
	
	
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if(command === 'command'){
		client.commands.get('command').execute(message, args, Discord);
	}
});


client.login(token);