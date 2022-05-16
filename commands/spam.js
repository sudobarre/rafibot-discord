module.exports = {
	name :'spam',
	description: 'Spams 10 times with the message sent',
	once: true,
	async execute(client, message, cmd, args) {
        for(let i = 0; i <10; i++){
		message.channel.send(`${args.join(' ')}`);
        }
	},
};
