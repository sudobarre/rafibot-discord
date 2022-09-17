const userSchema = require("../schema/userSchema");

module.exports = {
	name :'createplaylist',
    aliases: ['createp'],
	description: 'creates a playlist.',
	once: true,
	async execute(client, message, cmd, args) {
        //format: -rafi createp (title) (description) (visibility) (song url)
        //                         0          1             2           3  
        try {
            const id = message.author.id;
            const user = await userSchema.findOne({userId: id});
            const plists = user.playlists;
            for(let i = 0; i < plists.length; i++){
                if(plist[i].title === args[0]){
                    return message.reply("A playlist with that title already exists!");
                }
            };
            const newPlaylist = {
                type: [String],
                songs: [args[3]],
                description: {
                    title: args[0],
                    description: args[1],
                    visibility: args[2],
                }
            };
            console.log(newPlaylist);
            const plist = user.playlists.push(newPlaylist); //song url i guess
            await userSchema.findOneAndUpdate({userId : id}, plist);
            user.save();
            //console.log(user);
            return message.reply('Playlist created successfully!');
        } catch (error) {
            console.error(error);
        }
    },
};
    