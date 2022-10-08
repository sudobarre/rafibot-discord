const User = require("../schema/userSchema");


module.exports = {
	name :'addquote',
	description: 'adds a quote of a given member',
    aliases: ['addq'],
	once: true,
	async execute(client, message, cmd, args) {
        //tag - quote
        if(args.length <= 1) return message.reply("Please send the tag and a quote to add!");
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
        if(!mention) return message.reply("Invalid tag! Make sure the member is in the server.");
        let quoteArr = args;
        quoteArr.shift();
        const quote = quoteArr.join(' ');
        try {
            let user = await User.findOne({userId: mention.id});
            if(!user){
                user = new User({
                    userId: mention,
                    quotes: [],
                });
            }
            let newQuotesArr = user.quotes;
            newQuotesArr.unshift(quote); 
            user.quotes = newQuotesArr;
            await user.save();
            return message.reply('Quote added successfully!');
        } catch (error) {
            console.error(error);
        }
    },
};
    
