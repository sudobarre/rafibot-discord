module.exports = (client, Discord, guildMember) => {
    const welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'citizens');
	guildMember.roles.add(welcomeRole);
    const channel = guildMember.guild.channels.cache.get('971480144747323404'); //915210119904657431' for nothingham 
    if (!channel) return;
    channel.send('are u alyen');
};
