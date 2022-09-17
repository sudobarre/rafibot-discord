const { Client, Message, MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'songs',
    async execute(client, message, cmd, args, Discord){ //play-dl as alternative
        const command = client.commands.get('play');
        const song = ['https://www.youtube.com/watch?v=r6-cbMQALcE']; //15 mins of silence lol
        command.execute(client, message, 'play', song , Discord, 0);
         if(!message.member.voice.channel) return;

        const row = new MessageActionRow() //ActionRowBuilder()?
        .addComponents(
            new MessageSelectMenu() //SelectMenuBuilder()?
            .setCustomId('choose-song')
            .setPlaceholder('Choose the type of music you wanna hear.')
//            .setDisabled(true)
            .addOptions([
                {
                    label: 'Sleeping',
                    description: 'Plays songs to sleep to.',
                    value: 'Sweet dreams!',
                    emoji: '🛌',
                },
                {
                    label: 'Studying',
                    description: 'Plays ambient music for studying.',
                    value: 'Goodluck!',
                    emoji: '📚',
                },
                {
                    label: 'Sad',
                    description: 'Songs for when you are in a sad mood.',
                    value: 'Hope you feel better :)',
                    emoji: '😢',
                },
                {
                    label: 'Daddy Chill',
                    description: 'For when you just want to chill.',
                    value: 'Enjoy!',
                    emoji: '🧔‍♀️',
                },
            ]),
        );
        const embed = new MessageEmbed().setTitle('Hi! What type of music do you wanna listen to?');

        const filter = (interaction) => 
            interaction.isSelectMenu() && 
            interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({ filter, max: 1});

        collector.on('collect', async(collected) =>{
            const value = collected.values[0];

           
            collected.deferUpdate();

            collected.channel.send({
                content: value,
                ephemeral: true,
            });
            
        });
       message.channel.send({embeds: [embed], components: [row]});

    },
};