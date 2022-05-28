module.exports = (client, Discord, member) => {
     const channel = member.guild.channels.cache.get(process.env.general);
     if (!channel) return;
     channel.send('A member left the server.');
 };
 