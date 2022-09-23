const User = require("../schema/userSchema");
require('dotenv').config();

module.exports = {
    name: 'quote',
    aliases: ['q'],
    once: true,
    description : 'send a catchphrase from a guild member',
    async execute(client, message, cmd, args){

        try {
            const mention = getUserFromMention(args[0]);
            if(!mention){
                message.reply("Could not find the user you specified. Make sure to tag them!");
            }
            const user = await User.findOne({userId: mention.id});
            const quotesArr = user.quotes;
            if(quotesArr.length === 0){
                return message.channel.send("Member has no quotes yet! Do -rafi addquote (memberTag) (quote) to start adding quotes!");
            }
            const randomIndex = Math.floor(Math.random() * quotesArr.length);
            return message.channel.send(quotesArr[randomIndex]);
        } catch (error) {
            console.error(error);
        }


        function getUserFromMention(mention) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
        
                return client.users.cache.get(mention);
            }
            return 0;
        }
        /*
 
        switch(args[0]){
            case 'fun':
                message.reply(funCatch[Math.floor(Math.random() * funCatch.length)]);
                return;
            case 'rafi':
                message.reply(rafiCatch[Math.floor(Math.random() * rafiCatch.length)]);
                return;
            case 'ryan':
                message.reply(ryanCatch[Math.floor(Math.random() * ryanCatch.length)]);
                return;
            case 'aysan':
                message.reply(aysanCatch[Math.floor(Math.random() * aysanCatch.length)]);
                return;
            case 'ice':
                message.reply(aysanCatch[Math.floor(Math.random() * aysanCatch.length)]);
                return;
            case 'sun':
                message.reply(aysanCatch[Math.floor(Math.random() * aysanCatch.length)]);
                return;
            case 'icesun':
                message.reply(aysanCatch[Math.floor(Math.random() * aysanCatch.length)]);
                return;
            case 'angel':
                message.reply(aysanCatch[Math.floor(Math.random() * aysanCatch.length)]);
                return;
            case 'bitch':
                message.reply(simaCatch[Math.floor(Math.random() * simaCatch.length)]);
                return;
            case 'mayer':
                message.reply(mayerCatch[Math.floor(Math.random() * mayerCatch.length)]);
                return;
            case 'ard':
                message.reply(ardCatch[Math.floor(Math.random() * ardCatch.length)]);
                return;
            case 'sima':
                message.reply(simaCatch[Math.floor(Math.random() * simaCatch.length)]);
                return;
            default:
                break;
        }
  
        */
    },
};
