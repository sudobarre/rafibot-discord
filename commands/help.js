/*
module.exports = {
    name: 'help',
    description: 'displays all available commands',
    once : true,
    async execute(client, message, cmd, args, Discord){
        const embed = new Discord.MessageEmbed()
            .setColor('#75BB67')
            .setTitle('Available Commands')
            .setDescription('Using the prefix -rafi:\n')
            .addFields(
                {name: 'coinflip (flip, coin)', value: 'Tosses a coin.' },
                {name: 'dice [n]', value: 'Rolls an n-sided dice, where n is the parameter passed in the command. Cant be lower than 1.' },
                {name: 'inspire', value: 'Feeling down? Let RafiBot motivate you!' },
                {name: 'quote (q) [member_tag]', value: 'Returns a random famous catchphrase from the member tag passed or in some cases and with very special people with just their nicknames.' },
                {name: 'vote', value: 'Simple voting message with the proper emoji reactions added.' },
                {name: 'bark (woof, raf)', value: 'Barks like a good boy.'},
                {name:'play (p) [song_name | yt_link]', value:'Plays a yt song via link or name. As he was rightly taught by his owner, he never stops, always at 110 percent; so when a member leaves the channel, he would greatly appreciate it if you used -rafi stop when done listening.'},
                {name: 'stop', value: 'Stops music and bot leaves the vc.'},
                {name: 'skip', value: 'Skips the current song.'},
                {name: 'queue', value: 'Displays the songs queue.'},
                {name: 'songs', value: 'Offers a personalised selection of music depending on the category chosen. May take a bit to load the songs.'},
                {name: 'akinator', value: "Starts an Akinator session!"},
                {name: '/pause', value: 'Pauses the music'},
                {name: '/info', value: "Displays info about the currently playing song"},
                {name: '/play [yt_url | song_name]', value: "Loads a single song or a playlist of songs from a url or a provided keyword from yt."},
                {name: '/queue', value: "Displays the current song queue."},
                {name: '/quit', value: "Stops the bot and clears the queue."},
                {name: '/resume', value: "Resumes the music."},
                {name: '/shuffle', value: "Shuffles the queue."},
                {name: '/skip', value: "Skips the current song."},
                {name: '/skipto [track_queue_number]', value: "Skips to a certain track in the queue by providing the number of the track to skip to."},
            );
        message.channel.send({ embeds: [embed] });
    },
}; */
const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
module.exports = {
    name: 'help',
    description: 'displays all available commands',
    once : true,
    async execute(client, message, cmd, args, Discord){

// Constants

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

const {author, channel} = message
const helpAll = [
                {name: 'createplaylist(createp, addp) [public/private] [title] [yt-url]', value: 'Creates a playlist with the given title and adds the given song to it. If its set to private, only you will be able to listen to it.' },
                {name: 'deleteplaylist(deletep, removep)', value: 'Deletes a playlist and all its songs.' },
                {name: 'listplaylist(listp) [optional: user_tag]', value: 'Lists all of the user playlists. If a tag is given, it lists all of the playlists of that user mentioned.' },
                {name: 'addsong(adds) [playlist_index] [yt-url]', value: 'Adds a song to the playlist indicated by the index.' },
                {name: 'listsongs(lists) [playlist_index] [optional: user_tag]', value: 'Lists all songs in the playlist indicated by the index. If a tag is given, it lists all of the songs of that user playlist if its public.' },
                {name: 'removesong(deletesong) [playlist_index] [song_index] ', value: 'Deletes a song located in the index of the playlist indicated by the index. The indexes are the position indicated on their list.' },
                {name: 'songs [optional: user_tag]', value: 'Plays one of your playlists. If a tag is given, it plays the mentioned user playlist, if said playlist is set to public. May take some time to load the songs.'},
                {name: 'play (p) [song_name or yt_link]', value:'Plays a yt song via link or name. Pls do -rafi stop when you are done listening, as he doesnt know when to stop and he will keep playing until someone ends his torture.'},
                {name: 'stop', value: 'Stops music and leaves the vc.'},
                {name: 'skip', value: 'Skips the current song.'},
                {name: 'queue', value: 'Displays the songs queue.'},
                {name: 'addquote(addq) [member_tag] [quote_to_add]', value: 'Adds a quote to a given member.'},
                {name: 'removequote(removeq) [member_tag] [quote_to_remove]', value: 'Removes a quote from a given member.'},
                {name: 'quote (q) [member_tag]', value: 'Returns a random catchphrase from the member tag passed.' },
                {name: 'coinflip (flip, coin)', value: 'Tosses a coin.' },
                {name: 'dice [n]', value: 'Rolls an n-sided dice, where n is the parameter passed in the command. Cant be lower than 1.' },
                {name: 'inspire', value: 'Feeling down? Let RafiBot motivate you!' },
                {name: 'vote', value: 'Simple voting message with the proper emoji reactions added.' },
                {name: 'bark (woof, raf)', value: 'Barks like a good boy.'},
            ]


 //* Creates an embed with guilds starting from an index.
 ///* @param {number} start The index to start from.
 //* @returns {Promise<MessageEmbed>}
 
 const generateEmbed = async start => {
    const current = helpAll.slice(start, start + 5)
  
    // You can of course customise this embed however you want
    return new MessageEmbed({
      title: `Showing commands ${start + 1}-${start + current.length} out of ${
        helpAll.length
      }`,
      fields: await Promise.all(
        current.map(async (guild, index) => ({
          name: current[index].name,
          value: current[index].value//}`
        }))
      )
    })
  }
  
  // Send the embed with the first 10 guilds
  const canFitOnOnePage = helpAll.length <= 5
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
            ...(currentIndex + 5 < helpAll.length ? [forwardButton] : [])
          ]
        })
      ]
    })
  })
}
}