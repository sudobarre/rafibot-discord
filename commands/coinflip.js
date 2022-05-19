module.exports = {
	name :'coinflip',
	description: 'flips a coin!',
    aliases : ['flip', 'coin'],
	once: true,
	async execute(client, message, cmd, args) {
        Math.random() < 0.5 ? message.reply(`Your coin landed on tails!`) : message.reply('Your coin landed on heads!');
	},
};
