const User = require("../schema/userSchema");

require('dotenv').config();

module.exports = {
    name: 'quote',
    aliases: ['q'],
    once: true,
    description : 'send a catchphrase from a guild member',
    async execute(client, message, cmd, args){
        //-rafi q @tag
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
        try {
            const mention = getUserFromMention(args[0]);
            if(!mention){
                message.reply("Could not find the user you tagged. Make sure they are in the server!");
            }
            const user = await User.findOne({userId: mention.id});
            if(!user) return message.reply("Member has no quotes yet! Do -rafi addquote [memberTag] [quote] to start adding quotes!")
            const quotesArr = user.quotes;
            if(quotesArr.length === 0){
                return message.channel.send("Member has no quotes yet! Do -rafi addquote [memberTag] [quote] to start adding quotes!");
            }
            const randomIndex = Math.floor(Math.random() * quotesArr.length);
            return message.channel.send(quotesArr[randomIndex]);
        } catch (error) {
            console.error(error);
        }
    }
    
};
