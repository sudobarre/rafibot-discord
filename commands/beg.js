const begPhrases = ['IM A BARBIE GIRL', 'IN A BARBIE WORLD', 'LIFE IS PLASTIC', 'ITS FANTASTIC', 'narrator give me coin pls', 'bitch give me money', 'Please gimme some coins', 'Señor please give me money', 'Señor por favor give me coins pls'];
module.exports = {
	name :'beg',
	description: 'Begs for virtual currency',
	once: true,
	async execute(client, message, cmd, args) {
/*		const narrative = message.guild.members.fetch(member => member.id === process.env.narrator);
		if(!narrative.presence){
			message.reply(`It's pointless; narrator is offline.`);
		} else { */
			const quote = begPhrases[Math.floor(Math.random() * begPhrases.length)];
			return message.reply(`${quote}`);
		//}
	},
};
