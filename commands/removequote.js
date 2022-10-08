const User = require("../schema/userSchema");


module.exports = {
	name :'removequote',
	description: 'removes a quote of a given member',
    aliases: ['removeq', 'deleteq'],
	once: true,
	async execute(client, message, cmd, args) {
        //tag - index
        function getUserFromMention(mention) {
            if (!mention) return false;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
                return client.users.cache.get(mention);
            }
            return false;
        }
        if(args.length <= 1) return message.reply("Please send the tag and the index of the user's quote to remove!");
        const mention = getUserFromMention(args[0]);
        if(!mention) return message.reply('Invalid tag! Please make sure the member is in the guild.');
        args.shift();
        const index = parseInt(args[0]);
        index--;
        try {
            const user = await User.findOne({userId: mention.id});
            if(!user) return message.channel.send("Member has no quotes yet! Do -rafi addquote [memberTag] [quote] to start adding quotes!");
            let quotesArr = user.quotes;
            if((!Number.isInteger(index))||index >= quotesArr.length || index < 0) return message.reply('Invalid index!\nDo "-rafi listquotes [member_tag]" to see all available quotes!');
            quotesArr.splice(index, 1);
            user.quotes = quotesArr;
            await user.save();
            return message.reply('Quote removed successfully.');
        } catch (error) {
            console.error(error);
        }
    },
};
    
