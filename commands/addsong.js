const userSchema = require("../schema/userSchema");

module.exports = {
	name :'addsong',
    aliases: ['adds'],
	description: 'adds a song to a playlist.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi addsong (url) (playlistIndex)
        try {
            const id = message.author.id;
            const user = await userSchema.findOne({userId: id});
            if(user.playlists.length === 0){
                return message.reply(`You don't have any playlist saved yet!\nTry "-rafi createp (title) (description) (songURL) (visibility)" to create a playlist!\nFor more information, do "-rafi help".`);
            }
            const index = args[1];
            if((!index.isInteger) || index >= user.playlists.length || index < 0) return message.reply("Invalid index!\nTry '-rafi listp' to see all your available playlists!");

           
            const plist = user.playlists[index].push(args[0]); //song url i guess
            await userSchema.findOneAndUpdate({userId : id}, plist);
            user.save();
            //console.log(user);
            return message.reply('Song added successfully!');
        } catch (error) {
            console.error(error);
        }
    },
};
    
