module.exports = {
	name :'ping',
	description: 'Replies with Pong!',
	async execute(client, message, args) {
		message.reply('Pong!');
	},
};
