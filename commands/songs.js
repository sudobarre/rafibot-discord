const { Client, Message, MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'songs',
    /**
     * @param {Client}
     * @param {message}
     * @param {cmd}
     * @param {args}
     * @param {Discord}
     */
    async execute(client, message, cmd, args, Discord){
        const command = client.commands.get('play');
        const song = ['baby', 'shark'];
        command.execute(client, message, 'play', song , Discord, 0);
/*
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have permission to do that');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have permission to do that');
*/
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('choose-song')
            .setPlaceholder('Choose the type of music you wanna hear.')
//            .setDisabled(true)
            .addOptions([
                {
                    label: 'Sleeping',
                    description: 'Plays songs to sleep to.',
                    value: 'Sweet dreams!',
                    emoji: '1️⃣',
                },
                {
                    label: 'Studying',
                    description: 'Plays ambient music for studying.',
                    value: 'Goodluck!',
                    emoji: '2️⃣',
                },
                {
                    label: 'Sad',
                    description: 'Songs for when you are in a sad mood.',
                    value: 'Hope you feel better :)',
                    emoji: '3️⃣',
                },
                {
                    label: 'Daddy Chill',
                    description: 'For when you want to just chill.',
                    value: 'Slay!',
                    emoji: '4️⃣',
                },
            ]),
        );
        const embed = new MessageEmbed().setTitle('Hi! What type of music do you wanna listen to today?');

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