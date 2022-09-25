const User = require("../schema/userSchema");
const ytdl = require('ytdl-core');

module.exports = {
	name :'addsong',
    aliases: ['adds', 'addsongs'],
	description: 'adds a song to a playlist.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi addsong (playlistIndex) (url)
        //                            0           1  
        if(!ytdl.validateURL(args[1])) return message.reply('Invalid song! Song needs to be a YouTube URL.');
        try {
            const id = message.author.id;
            const user = await User.findOne({userId: id});
            if(user.playlists.length === 0){
                return message.reply(`You don't have any playlist saved yet!\nTry "-rafi createp (title) (songURL) (public/private)" to create a playlist!\nFor more information, do "-rafi help".`);
            }
            let index = parseInt(args[0]);
            if((!Number.isInteger(index)) || index > user.playlists.length || index <= 0) return message.reply("Invalid index!\nTry '-rafi listp' to see all your available playlists!");
            index--;
            const plist = user.playlists[index];
            plist.songs.push([args[1]]);
            user.playlists[index] = plist;
            user.save();
            return message.reply('Song added successfully!');
        } catch (error) {
            console.error(error);
        }
    },
};

    
