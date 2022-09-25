const akinator = require('discord.js-akinator');

const language = 'en';
const childMode = false;
const gameType = 'character';
const useButtons = 'true';
const embedColor = '#1F1E33';

module.exports = {
	name :'akinator',
	description: 'Starts an Akinator session!',
	once: true,
	async execute(client, message, cmd, args) {
		akinator(message,{
            language:language,
            childMode: childMode,
            gameType: gameType,
            useButtons: useButtons,
            embedColor: embedColor,
        });
	},
};

