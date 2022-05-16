module.exports = {
	name :'dice',
	description: 'Rolls a six-sided dice',
	once: true,
	async execute(client, message, cmd, args) {
     message.reply(`You rolled a ${Math.floor(Math.random() * 6) + 1}!`);
	},
};
