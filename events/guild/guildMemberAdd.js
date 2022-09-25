const welcomes = ['Welcome to the Server! Before you can start enjoying our marvelous community you will have to answer just one question!\nWould you rather eat a baby goat or a matter baby?'];
module.exports = (client, Discord, guildMember) => {
    if(guildMember.guild.id != process.env.guildId) return;
    const welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Citizen of Nothingham');
	guildMember.roles.add(welcomeRole);
    const channel = guildMember.guild.channels.cache.get(process.env.general);
    if (!channel) return;
    const randomIndex = Math.floor(Math.random() * welcomes.length);
    const item = welcomes[randomIndex];
    channel.send(item);
};
