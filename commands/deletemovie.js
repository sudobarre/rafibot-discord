const Guild = require("../schema/guildSchema");


module.exports = {
	name :'removemovie',
	description: 'removes a movie',
    aliases: ['removem', 'deletem'],
	once: true,
	async execute(client, message, cmd, args) {
        //index
        if(args.length != 1) return message.reply("Please send the index of the movie to remove!");

        const index = parseInt(args[0]);
        index--;
        const id = message.guild.id;
        try {
            const guild = await Guild.findOne({guildId: id});
            let movies = guild.movies;
            if((!Number.isInteger(index))||index >= movies.length || index < 0) return message.reply('Invalid index!\nDo "-rafi listmovies" to see all movies!');
            movies.splice(index, 1);
            await guild.update({guildId:id}, movies);
            return message.reply('Movie removed successfully.');
        } catch (error) {
            console.error(error);
        }
    },
};
    
