module.exports = {
	name :'bark',
	description: 'barks!',
    aliases : ['woof', 'raf'],
	once: true,
	async execute(client, message, cmd, args) {
        let barks = [];
        const barkAmount = Math.floor(Math.random() * 3) + 1;
        for(let i = 0; i < barkAmount; i++){
            barks.push('Raf!');
        }
        message.channel.send(`${barks.join(' ')}`);
    },
};