module.exports = {
	name :'ping',
	description: 'Replies with Pong!',
	once: true,
	async execute(client, message, args) {
		message.reply('Pong!');
	},
};
