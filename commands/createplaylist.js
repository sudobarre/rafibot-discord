const User = require("../schema/userSchema");
const Playlist = require("../schema/playlistSchema");
const ytdl = require('ytdl-core');

module.exports = {
	name :'createplaylist',
    aliases: ['createp', 'addp'],
	description: 'creates a playlist.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi createp (visib) (title) (song url)
        //                         0       1           2          
        //function to validate regex, yt validate from ytdl
        if(!(args[0] === 'public' || args[0] === 'private')) return message.reply("You need to specify the playlist visibility!\nFor more information, do '-rafi help'.");
        if(!ytdl.validateURL(args[2])) return message.reply('Invalid song! Song needs to be a YouTube URL.');
        try {
            const id = message.author.id;
            function visib(arg){
                return  arg === "public" ? true : false;
            };

            const newSongs = args[2];
            const plistTitle = args.shift(); //byebye visibility
            plistTitle.pop(); //byebye yt link
            const v = visib(args[0]);
            const user = await User.findOne({userId:id});
            if(user.playlists.length >= 10) return message.reply("Limit of 10 playlists reached! Please delete a playlist, or add songs to an existing one.\nFor more information, do -rafi help.");
            for(let i = 0; i < user.playlists.length; i++){
                if(user.playlists[i].title === plistTitle) return message.reply("A playlist with that title already exists!");
            }
            const newPlaylist = new Playlist({
                songs: [[newSongs]],
                title: plistTitle,
                visibility: v
            });
            newPlaylist.save();         
            user.playlists.push(newPlaylist);
            user.save();
            return message.channel.send('Playlist created successfully!');
        } catch (error) {
            console.error(error);
        }
    },
};
    