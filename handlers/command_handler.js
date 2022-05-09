const fs = require('fs');

module.exports = (client, Discord) =>{
    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    for (const file of command_files) {
        const command = require(`../commands/${file}`);
        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
};