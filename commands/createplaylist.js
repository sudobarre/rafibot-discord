const userSchema = require("../schema/userSchema");

module.exports = {
	name :'createplaylist',
    aliases: ['createp'],
	description: 'creates a playlist.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi createp (title) (visibility) (song url)
        //                         0          1           2          
        //function to validate regex, yt validate from ytdl

        if(!(args[1] === 'public' || args[1] === 'private')) return message.reply("You need to specify the playlist visibility!\nFor more information, do '-rafi help'.");
        try {
            const id = message.author.id;
            const user = await userSchema.findOne({userId: id});
            const playlists = user.playlists;
            console.log("playlists: " + playlists);

            const newP = {
                type: [[String]],
                songs: [args[2]],
                title: args[0],
                visibility: args[1],
            };
            let newPlaylist = newP;
            console.log("new plist: " + newPlaylist.songs);

            if(playlists.length === 0){
                const playlists = playlists.push(newPlaylist); //song url i guess
                await userSchema.findOneAndUpdate({userId : id}, playlists);
                user.save();
                console.log("esta yendo al primer coso " + user);
                return message.reply('Playlist created successfully!');
            } else {
                for(let i = 0; i < playlists.length; i++){
                    if(playlists[i].playlist.title === args[0]){
                        return message.reply("A playlist with that title already exists!");
                    }
                };
                playlists.push(newPlaylist); //song url i guess
                console.log("las nuevas playlists son:\n");
                console.log(playlists);
                await userSchema.findOneAndUpdate({userId : id}, playlists);
                user.save();
                //console.log(user);
                return message.reply('Playlist created successfully!');
            }
        } catch (error) {
            console.error(error);
        }
    },
};
    