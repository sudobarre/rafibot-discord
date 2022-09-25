const User = require("../schema/userSchema");

module.exports = {
	name :'removesong',
    aliases: ['removesongs', 'deletesong', 'deletes', 'removes'],
	description: 'removes a song from a playlist.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi removesong (playlistIndex) (songIndex)
        //                            0                1
        try {
            const id = message.author.id;
            const user = await User.findOne({userId: id});
            if(user.playlists.length === 0){
                return message.reply(`You don't have any playlist saved yet!\nTry "-rafi createp (title) (songURL) (public/private)" to create a playlist!\nFor more information, do "-rafi help".`);
            }
            let playlistIndex = parseInt(args[0]);
            if((!Number.isInteger(playlistIndex)) || playlistIndex > user.playlists.length || playlistIndex <= 0) return message.reply("Invalid index!\nTry '-rafi listp' to see all your available playlists!");
            playlistIndex--;

            let songIndex = parseInt(args[1]);
            if((!Number.isInteger(songIndex)) || songIndex > user.playlists[playlistIndex].length || songIndex <= 0) return message.reply("Invalid index!\nTry '-rafi listsong (playlist index)' to see all your available songs!");
            songIndex--;
            const plist = user.playlists[playlistIndex];
            //remove the song from the plist
            plist.songs.splice(songIndex, 1);
            user.playlists[playlistIndex] = plist;
            user.save();
            return message.reply('Song removed!');
        } catch (error) {
            console.error(error);
        }
    },
};

    