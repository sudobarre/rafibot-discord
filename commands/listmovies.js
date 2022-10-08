const Guild = require("../schema/guildSchema");
const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');

module.exports = {
	name :'listmovies',
    aliases: ['listm', 'listmovies'],
	description: 'lists all movies in the guild.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi listm

        try {
            const id = message.guild.id;
            let guild = await Guild.findOne({guildId: id});
            if(!guild) return message.reply("There are no movies saved up yet! Start adding some by sending '-rafi addmovie [movie_title]'!");
            const movies = guild.movies;
            if(movies.length === 0){
                return message.reply("There are no movies saved up yet! Start adding some by sending '-rafi addmovie [movie_title]'!");
            }

            return this.embedSender(client, message, movies); //return embed
        } catch (error) {
            console.error(error);
        }
        
    },
    async embedSender(client, message, movies, args) {
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
            let titles = movies;
    
            //* Creates an embed with guilds starting from an index.
            ///* @param {number} start The index to start from.
            //* @returns {Promise<MessageEmbed>}
            
            const generateEmbed = async start => {
                let current = [];
                      for(let i = start; i < start+5; i++){
                        if(i === titles.length-1){ 
                            current.push(movies[i]);
                            i = start + 5; //shitty way in case its not multiple of ten, could use modulo later idk too braindead rn lol.
                        } else {
                          current.push(movies[i]);
                        }
                      }
                //current = array of plist of 5 elements max, cycles with forward/back buttons.

                
                return new MessageEmbed({   
                title: `Showing movies ${start + 1}-${start + current.length} out of ${
                    titles.length}`,
                fields: await Promise.all(
                    current.map(async (movies, index) => ({
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
                        ...(currentIndex + 5 < movies.length ? [forwardButton] : [])
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
