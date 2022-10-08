const mongoose = require('mongoose');
const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { Intents } = require('discord.js');
//const { Player } = require("discord-player");

//node index.js load

require('dotenv').config();

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

let commands = [];

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"));
for (const file of slashFiles){
    const slashcmd = require(`./slash/${file}`);
    client.slashcommands.set(slashcmd.data.name, slashcmd);
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON());
}

if (LOAD_SLASH) {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    console.log("Deploying slash commands");
    rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), {body: commands}) 
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

/*
//make sure to check out play command to ignore the playing msg
client.on("ready", async ()=>{
    const guild = await client.guilds.cache.get("915210119904657428");
    const channel = await guild.channels.cache.get("933423366822588487"); //the channel where the msg is
    const msg = await channel.messages.fetch("1016448062744440893");
    const song = ["https://www.youtube.com/watch?v=A3ytTKZf344"];
    const commandPlay = client.commands.get("play");
    commandPlay.execute(client, msg, "play", song, Discord);

}); */

client.login(process.env.TOKEN);
mongoose.connect(process.env.db, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to database.");
}).catch((err) => {
    console.error(err);
});

