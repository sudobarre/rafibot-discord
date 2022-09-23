const User = require("../schema/userSchema");

module.exports = {
	name :'deleteplaylist',
    aliases: ['removep','deletep', 'removep'],
	description: 'deletes a playlist.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi removeplaylist (playlistIndex) (songIndex)
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

            const plists = user.playlists;
            //remove the song from the plist
            plists.splice(playlistIndex, 1);
            user.playlists = plists;
            user.save();
            return message.reply('Playlist deleted!');
        } catch (error) {
            console.error(error);
        }
    },
};

    