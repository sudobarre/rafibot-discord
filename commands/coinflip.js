module.exports = {
	name :'coinflip',
	description: 'flips a coin!',
    aliases : ['flip', 'coin'],
	once: true,
	async execute(client, message, cmd, args) {
        const res = Math.random();
        if(res < 0.5){
            message.reply(`Your coin landed on tails!`);
        } else {
            message.reply('Your coin landed on heads!');
        }
	},
};
