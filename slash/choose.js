const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");
//const { execute } = require("../commands/play");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('songs')
        .setDescription('Provides songs based on the input'),
    async execute(interaction, client) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('song-select')
                    .setPlaceholder('Nothing selected yet.')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Sleeping',
                            description: 'Plays songs to sleep to.',
                            value: 'sleep',
                        },
                        {
                            label: 'Studying',
                            description: 'Plays ambient music for studying.',
                            value: 'study',
                        },
                        {
                            label: 'Sad',
                            description: 'Songs for when you are in a sad mood. Ps dont be sad :)',
                            value: 'sad',
                        },
                        {
                            label: 'rafiSpecial',
                            description: 'Rafis best songs ever',
                            value: 'rafi',
                        },
                    ]),
            );
            await interaction.reply({ content: 'Hi! What type of music do you wanna listen to today?', components: [row]});
    },
};