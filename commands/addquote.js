const userSchema = require("../schema/userSchema");

module.exports = {
	name :'addquote',
	description: 'adds a quote of a given member',
    aliases: ['addq'],
	once: true,
	async execute(client, message, cmd, args) {
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
            const user = await userSchema.findOne({userId: mention.id});
            const newQuotesArr = user.quotes;
            newQuotesArr.push(quote);
            const newQuotes = {quotes:newQuotesArr};
            await userSchema.findOneAndUpdate({userId:mention.id}, newQuotes);
            user.save();
            //console.log(user);
            return message.reply('Quote added successfully!');
        } catch (error) {
            console.error(error);
        }
    },
};
    
