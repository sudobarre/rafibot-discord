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
                {name: 'coinflip', value: 'Tosses a coin.' },
                {name: 'dice', value: 'Rolls a six-sided dice.' },
                {name: 'inspire', value: 'Feeling down? Let RafiBot motivate you!' },
                {name: 'quote [member tag]', value: 'Returns a random famous catchphrase from the member tag passed or in some cases and with very special people with just their nicknames.' },
                {name: 'vote', value: 'Simple voting message with the proper emoji reactions added.' },
                {name: 'drink', value:'Drinks mate. Thats it. Ard told me to add this.'},
                {name: 'spam [message to send]', value: 'Spams the channel with the message to send (pls dont use it often :) )'},
                {name: 'beg', value: 'Begs for virtual currency in a videogame. Definitely not a low point in life.'},
                {name: 'bark', value: 'Barks like a good boy.'},
            );
        message.channel.send({ embeds: [embed] });
    },
};