const begPhrases = ['narrator give me coin pls', 'bitch give me money', 'Please gimme some coins', 'Señor please give me money', 'Señor por favor give me coins pls'];
module.exports = {
	name :'beg',
	description: 'Begs for virtual currency',
	once: true,
	async execute(client, message, cmd, args) {
        const quote = begPhrases[Math.floor(Math.random() * begPhrases.length)];
		message.reply(`${quote}`);
	},
};
