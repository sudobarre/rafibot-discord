const User = require("../schema/userSchema");
const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');

module.exports = {
	name :'listquote',
    aliases: ['listq', 'listquotes'],
	description: 'lists the quotes of a given user.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi listq (tag)

        try {
            let id;
            if(args.length > 0){
                id = getUserFromMention(args[0]);
                if(!id) return message.reply('Invalid mention! Make sure the member you tagged is in the server!');
                id = id.id; //dont try this at home.
            }else{
                id = message.author.id;
            }           
            let user = await User.findOne({userId: id});
            if(!user || (user.quotes.length === 0)){
                return message.reply("User doesn't have any quotes yet! Start adding some by sending 'rafi addq [tag] [quote]'!");
            }

            const quotes = user.quotes;

            const embed = new MessageEmbed()
            .setTitle(`From ${client.users.cache.get(id).username}:`);
            message.channel.send({embeds: [embed]});
            return this.embedSender(client, message, quotes); //return embed
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
    },
    async embedSender(client, message, quotes, args) {
        //plist: only the array of arrays of one song each.
        try {
   
            const backId = 'back'
            const forwardId = 'forward'
            const backButton = new MessageButton({
            style: 'SECONDARY',
            label: 'Back',
            emoji: '⬅️',
            customId: backId
            })
            const forwardButton = new MessageButton({
            style: 'SECONDARY',
            label: 'Forward',
            emoji: '➡️',
            customId: forwardId
            })
    
            // Put the following code wherever you want to send the embed pages:
    
            const {author, channel} = message;
            //change it to array of playlist titles
            let titles = quotes;
    
            //* Creates an embed with guilds starting from an index.
            ///* @param {number} start The index to start from.
            //* @returns {Promise<MessageEmbed>}
            
            const generateEmbed = async start => {
                let current = [];
                      for(let i = start; i < start+5; i++){
                        if(i === titles.length-1){ 
                            current.push(quotes[i]);
                            i = start + 5; //shitty way in case its not multiple of ten, could use modulo later idk too braindead rn lol.
                        } else {
                          current.push(quotes[i]);
                        }
                      }
                //current = array of plist of 5 elements max, cycles with forward/back buttons.

                
                return new MessageEmbed({   
                title: `Showing quotes ${start + 1}-${start + current.length} out of ${
                    titles.length}`,
                fields: await Promise.all(
                    current.map(async (quotes, index) => ({
                    name:`**${index+1+start}**:`,
                    value: `${current[index]}`,
                    }))
                )
                })
            }
            
            // Send the embed with the first 10 playlist
            const canFitOnOnePage = titles.length <= 5
            const embedMessage = await channel.send({
                embeds: [await generateEmbed(0)],
                components: canFitOnOnePage
                ? []
                : [new MessageActionRow({components: [forwardButton]})]
            })
            // Exit if there is only one page of guilds (no need for all of this)
            if (canFitOnOnePage) return;
            
            // Collect button interactions (when a user clicks a button),
            // but only when the button as clicked by the original message author
            const collector = embedMessage.createMessageComponentCollector({
                filter: ({user}) => user.id === author.id,
                time: 500000,
            })
            
            //doesnt show the next page
            let currentIndex = 0
            collector.on('collect', async interaction => {
                // Increase/decrease index
                interaction.customId === backId ? (currentIndex -= 5) : (currentIndex += 5)
                // Respond to interaction by updating message with new embed
                await interaction.update({
                embeds: [await generateEmbed(currentIndex)],
                components: [
                    new MessageActionRow({
                    components: [
                        // back button if it isn't the start
                        ...(currentIndex ? [backButton] : []),
                        // forward button if it isn't the end
                        ...(currentIndex + 5 < quotes.length ? [forwardButton] : [])
                    ]
                    })
                ]
                })
            })
        } catch (error) {
            console.error(error);
        }
    },
};
