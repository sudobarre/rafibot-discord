const User = require("../schema/userSchema");


module.exports = {
	name :'addquote',
	description: 'adds a quote of a given member',
    aliases: ['addq'],
	once: true,
	async execute(client, message, cmd, args) {
        //tag - quote
        function getUserFromMention(mention) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
                return client.users.cache.get(mention);
            }
        }

        const mention = getUserFromMention(args[0]);

        const quoteArr = args;
        quoteArr.shift();
        const quote = quoteArr.join(' ');
        try {
            const user = await User.findOne({userId: mention.id});
            const newQuotesArr = user.quotes;
            newQuotesArr.push(quote);
            const newQuotes = {quotes:newQuotesArr};
            await User.findOneAndUpdate({userId:mention.id}, newQuotes);
            return message.reply('Quote added successfully!');
        } catch (error) {
            console.error(error);
        }
    },
};
    
