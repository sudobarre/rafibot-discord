module.exports = {
	name :'yawn',
	description: 'yawns!',
	once: true,
	async execute(client, message, cmd, args) {
        message.channel.send(`🥱`);
    },
};