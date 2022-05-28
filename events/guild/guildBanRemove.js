module.exports = (client, Discord, guild, user) => {
    const channel = user.guild.channels.cache.get(process.env.general);  
    if (!channel) return;
    channel.send(`${user.tag} has been unbanned from the server.`);
};