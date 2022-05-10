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

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handlers = ['command_handler', 'event_handler'];

for(const handler of handlers){

    require(`./handlers/${handler}`)(client, Discord);
}

client.login(token);