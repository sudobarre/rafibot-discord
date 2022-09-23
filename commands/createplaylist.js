const User = require("../schema/userSchema");
const Playlist = require("../schema/playlistSchema");

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
            function visib(arg){
                return  arg === "public" ? true : false;
            };
            const newSongs = args[2];
            const plistTitle = args[0];
            const v = visib(args[1]);
            const user = await User.findOne({userId:id});
            for(let i = 0; i < user.playlists.length; i++){
                if(user.playlists[i].title === plistTitle) return message.reply("A playlist with that title already exists!");
            }
            console.log(user);
            const newPlaylist = new Playlist({
                songs: [[newSongs]],
                title: plistTitle,
                visibility: v
            });
            newPlaylist.save();         
            user.playlists.push(newPlaylist);
            console.log(user.playlists);
            user.save();


            //console.log(newUser);
            //for(let i = 0; i < newUser.playlists.length; i++){
            //   console.log(newUser.playlists.songs);
            //}
            return message.reply('Playlist created successfully!');

           /* 
            if(playlists.length != 0){
                for(let i = 0; i < playlists.length; i++){
                    console.log(playlists[i].title);
                    if(playlists[i].title === args[0]){
                        return message.reply("A playlist with that title already exists!");
                    }
                };
            } 
               
            const user = await userSchema.findOne({userId : id});
            var playlistModel = new playlistSchema();
            playlistModel.songs = [[newSongs]];
            playlistModel.title = plistTitle;
            playlistModel.visibility = v;
            let newPlaylists = user.playlists;
            newPlaylists.push(playlistModel); //el playlistModel es un objeto vacio aunque sus partes no lo son
            await userSchema.findOneAndUpdate({userId : id}, {playlists:newPlaylists});



            user.save(function (err) {
                if (err) return handleError(err);

                const plist = new playlistSchema({
                    songs: [[newSongs]],
                    title: plistTitle,
                    visibility: v
                });

                playlistSchema.save(function (err) {
                    if (err) return handleError(err);
                    // that's it!
                });
            });
            
*/

            

        } catch (error) {
            console.error(error);
        }
    },
};
    