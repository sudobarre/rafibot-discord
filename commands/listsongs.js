const User = require("../schema/userSchema");
const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');

module.exports = {
	name :'listsong',
    aliases: ['lists'],
	description: 'lists the songs of a given playlsit.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi listsong (playlistIndex)
        // could use ytdl to find the title of the video            

        try {
            const id = message.author.id;
            const user = await User.findOne({userId: id});
            if(user.playlists.length === 0){
                return message.reply(`You don't have any playlist saved yet!\nTry "-rafi createp (title) (songURL) (public/private)" to create a playlist!\nFor more information, do "-rafi help".`);
            }
            let index = parseInt(args[0]);
            if((!Number.isInteger(index)) || index >= user.playlists.length || index < 0) return message.reply("Invalid index!\nTry '-rafi listp' to see all your available playlists!");
            index--;
            const plist = user.playlists[index].songs;

            return this.embedSender(client, message, plist); //return embed
        } catch (error) {
            console.error(error);
        }
    },
    async embedSender(client, message, plist, args) {
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
              let titles = plist;
    
            //* Creates an embed with guilds starting from an index.
            ///* @param {number} start The index to start from.
            //* @returns {Promise<MessageEmbed>}
            
            const generateEmbed = async start => {
                let current = [];
                    if(titles.length <= 10){
                        current = titles;
                    } else {
                      for(let i = 0; i < 10; i++){
                        if(i === titles.length-1){ //shitty way in case its not multiple of ten, could use modulo later idk too braindead rn lol.
                            current.push(plist[i]);
                            i = 10;
                        } else {
                          current.push(plist[i]);
                        }
                      }
                    }
                console.log(current);
    
                // You can of course customise this embed however you want
                return new MessageEmbed({   
                title: `Showing songs ${start + 1}-${start + current.length} out of ${
                    titles.length}`,
                fields: await Promise.all(
                    current.map(async (playlist, index) => ({
                    name:`${index+1}`,
                    value: `${current[index]}`
                    }))
                )
                })
            }
            
            // Send the embed with the first 10 playlist
            const canFitOnOnePage = titles.length <= 10
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
                filter: ({user}) => user.id === author.id
            })
            
            //doesnt show the next page
            let currentIndex = 0
            collector.on('collect', async interaction => {
                // Increase/decrease index
                interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)
                // Respond to interaction by updating message with new embed
                await interaction.update({
                embeds: [await generateEmbed(currentIndex)],
                components: [
                    new MessageActionRow({
                    components: [
                        // back button if it isn't the start
                        ...(currentIndex ? [backButton] : []),
                        // forward button if it isn't the end
                        ...(currentIndex + 10 < plist.length ? [forwardButton] : [])
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


