const { Client, Message, MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const User = require("../schema/userSchema");

module.exports = {
	name :'deleteplaylist',
    aliases: ['removeplaylist', 'deletep', 'removep'],
	description: 'deletes a playlist.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi removeplaylist
        const id = message.author.id;
        const user = await User.findOne({userId: id});
        if(user.playlists.length === 0){
            return message.reply(`You don't have any playlist saved yet!\nTry "-rafi createp (title) (songURL) (public/private)" to create a playlist!\nFor more information, do "-rafi help".`);
        }

        let current = user.playlists;
        //current would be my playlists

            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu() 
                .setCustomId('delete-playlist')
                .setPlaceholder('Choose playlist')
                .addOptions([await Promise.all(current.map(async (playlist, index) => ({
                    label:`${current[index].title}`,
                    value: `${[index]}`,
                    })))]),         
            );
            const embed = new MessageEmbed().setTitle('Choose a playlist to delete.\nThis will delete the playlist as well as all its songs.');

        const filter = (interaction) => 
            interaction.isSelectMenu() && 
            interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({ filter: ({user}) => user.id === message.author.id, max: 1});

        collector.on('collect', async(collected) =>{
            const value = collected.values[0];
            collected.deferUpdate();
            collected.channel.send({
                content: "Deleted successfully.",
                ephemeral: true,
            });
            
        });
       message.channel.send({embeds: [embed], components: [row]});

    },
}; 
/*
const User = require("../schema/userSchema");

module.exports = {
	name :'deleteplaylist',
    aliases: ['removeplaylist'],
	description: 'deletes a playlist.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi removeplaylist (playlistIndex) 
        //                           
        try {
            const id = message.author.id;
            const user = await User.findOne({userId: id});
            if(user.playlists.length === 0){
                return message.reply(`You don't have any playlist saved yet!\nTry "-rafi createp (title) (songURL) (public/private)" to create a playlist!\nFor more information, do "-rafi help".`);
            }
            let playlistIndex = parseInt(args[0]);
            if((!Number.isInteger(playlistIndex)) || playlistIndex > user.playlists.length || playlistIndex <= 0) return message.reply("Invalid index!\nTry '-rafi listp' to see all your available playlists!");
            playlistIndex--;

            const plists = user.playlists;
            //remove the song from the plist
            plists.splice(playlistIndex, 1);
            user.playlists = plists;
            user.save();
            return message.reply('Playlist deleted!');
        } catch (error) {
            console.error(error);
        }
    },
}; */

    