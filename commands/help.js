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
                {name: 'quote(q) [member_tag]', value: 'Returns a random quote from the user tagged.' },
                {name: 'listquote(listq) [member_tag]', value: 'Lists all of the quotes of the member tagged.' },
                {name: 'deletequote(deleteq) [member_tag] [quote_index]', value: 'Delete the quote in the position indicated by the index of the member tagged.' },
                {name: 'addquote(addq) [member_tag] [quote]', value: 'Adds the quote to the list of quotes of the given member.' },
                {name: 'listmovies(listm)', value: 'List all of the movies in the server.' },
                {name: 'addmovie (addm) [movie_name]', value: 'Adds the movie to the guild movies.' },
                {name: 'deletemovie(deletem) [index]', value: 'Deletes the movie in the position indicated by the index.' },
                {name: 'coinflip (flip, coin)', value: 'Tosses a coin.' },
                {name: 'dice [n]', value: 'Rolls an n-sided dice, where n is the parameter passed in the command. Cant be lower than 1.' },
                {name: 'inspire', value: 'Feeling down? Let RafiBot motivate you!' },
                {name: 'vote', value: 'Simple voting message with the proper emoji reactions added.' },
                {name: 'bark (woof, raf)', value: 'Barks like a good boy.'},
                {name: 'akinator', value: 'Starts an akinator session.' },
            ];


 //* Creates an embed with guilds starting from an index.
 ///* @param {number} start The index to start from.
 //* @returns {Promise<MessageEmbed>}
 
 const generateEmbed = async start => {
    const current = helpAll.slice(start, start + 5)
  
    // You can of course customise this embed however you want
    return new MessageEmbed({
      title: `Showing commands ${start + 1}-${start + current.length} out of ${
        helpAll.length
      }\nWith the prefix -rafi:`,
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

