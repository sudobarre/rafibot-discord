module.exports = {
    name: 'vote',
    description: 'cast an anonymous vote!',
    once : true,
    async execute(client, message, cmd, args, Discord){
        const channel = '923664327427375164';
        const thumbsUp = '👍';
        const thumbsDown = '👎';
        const embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Cast your vote')
            .setDescription('React to an emoji to cast your vote!\n');
        const messageEmbed = await message.channel.send({ embeds: [embed] });
        messageEmbed.react(thumbsUp);
        messageEmbed.react(thumbsDown);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if(!reaction.message.guild) return;
            if(!reaction.message.channel.id == channel) return;
            
        });
    },
};