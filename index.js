// Require the necessary discord.js classes
//const fetch = require('node-fetch');
//const fs = require('node:fs');
const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { Intents } = require('discord.js');
const { Player } = require("discord-player");

//node index.js load

require('dotenv').config();

//const serverinfo = require('./commands/serverinfo');
//const { ServerResponse } = require('node:http');
//const { channel } = require('node:diagnostics_channel');

// Create a new client instance
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], intents:[Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES,Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const LOAD_SLASH = process.argv[2] == "load";

const handlers = ['command_handler', 'event_handler'];

for(const handler of handlers){
try{
    require(`./handlers/${handler}`)(client, Discord);
    }catch(e){
        console.warn(e);
    }
}


client.slashcommands = new Discord.Collection();
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
    },
});

let commands = [];

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"));
for (const file of slashFiles){
    const slashcmd = require(`./slash/${file}`);
    client.slashcommands.set(slashcmd.data.name, slashcmd);
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON());
}

if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
    console.log("Deploying slash commands");
    rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.testId), {body: commands}) 
    .then(() => {
        console.log("Successfully loaded");
        process.exit(0);
    })
    .catch((err) => {
        if (err){
            console.log(err);
            process.exit(1);
        }
    });
}

   // client.on("interactionCreate", (interaction) => {
  //      async function handleCommand() {

//        if (!interaction.isCommand()) return;

//        const slashcmd = client.slashcommands.get(interaction.commandName);
//        if (!slashcmd) interaction.reply("Not a valid slash command");

//        await interaction.deferReply();
//        await slashcmd.run({ client, interaction });    
//    }
//    handleCommand();
//});


client.login(process.env.TOKEN);