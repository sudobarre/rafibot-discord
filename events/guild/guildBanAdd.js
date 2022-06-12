module.exports = (client, Discord, guild, user) => {
     const channel = user.guild.channels.cache.get(process.env.general);  
     if (!channel) return;
     channel.send(`lol get banned ${user.tag}`);
 };