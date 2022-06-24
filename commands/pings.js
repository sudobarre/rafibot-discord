module.exports = {
	name :'ping',
	description: 'Checks if bot is running.',
	once: true,
	async execute(client, message, cmd, args) {
		message.reply('Yes, I am alive.');
	},
};
