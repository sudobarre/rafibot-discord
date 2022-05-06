const { SlashCommandBuilder } = require('@discordjs/builders');
//Whenever you want to add a new command, make a new file in your commands directory,
//name it the same as the slash command, and then do what you did for the other commands.
//Remember to run node deploy-commands.js to register your commands!

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
