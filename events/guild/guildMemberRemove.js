module.exports = (client, Discord, member) => {
     const channel = member.guild.channels.cache.get(process.env.general);
     if (!channel) return;
     channel.send(`Goodbye ${member.user.tag}, we are sorry to see you go!`);
 };
 