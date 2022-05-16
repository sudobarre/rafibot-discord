module.exports = {
	name :'ping',
	description: 'Replies with Pong!',
	once: true,
	async execute(client, message, cmd, args) {
		message.reply('Yes, I am alive.');
	},
};
