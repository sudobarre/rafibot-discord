module.exports = {
	name :'dice',
	description: 'Rolls an n-sided dice given by the argument passed',
	once: true,
	async execute(client, message, cmd, args) {
	if(!args.length){
		message.reply('You need to specify a number to roll the dice!');
		return;
	}
     message.reply(`You rolled a ${Math.floor(Math.random() * args[0]) + 1}!`);
	},
};
