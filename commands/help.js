module.exports = {
    name: 'help',
    description: 'displays all available commands',
    once : true,
    async execute(client, message, args, Discord){
        const channel = '923664327427375164'; // 923664327427375164' for nothingham 
        const embed = new Discord.MessageEmbed()
            .setColor('#75BB67')
            .setTitle('Available Commands')
            .setDescription('Using the prefix -rafi:\n')
            .addFields(
                {name: 'coinflip', value: 'Tosses a coin' },
                {name: 'dice', value: 'Rolls a six-sided dice' },
                {name: 'inspire', value: 'Feeling down? let RafiBot motivate you!' },
                {name: 'quote [member tag]', value: 'Returns a random famous catchphrase from the member tag passed or in some cases and with very special people with just their nicknames.' },
                {name: 'vote', value: 'Simple voting message with the proper emoji reactions added' },
                {name: 'drink', value:'Drinks mate. Thats it. Ard told me to add this.'},
            );
        message.channel.send({ embeds: [embed] });
    },
};