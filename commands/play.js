const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus, NoSubscriberBehavior } = require('@discordjs/voice');
let connection;
const queue = new Map();
// queue (message.guild.id, queue_constructor object { voice channel, text channel, connection, song[]});
module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop'],
    description: 'Advanced music bot',
    async execute(client, message, cmd, args, Discord){
        
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have permission to do that');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have permission to do that');

        const server_queue = queue.get(message.guild.id);

        if (cmd === 'play' || cmd === 'p') {
            if (!args.length) return message.channel.send('You need to send the second argument');
            let song = {};

            if (ytdl.validateURL(args[0])){
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url };
            } else {
                //If the video is not a URL then use keywords to find that video.
                const video_finder = async (query) =>{
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                };

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url };
                } else {
                    message.channel.send('Error finding your video');
                }
            }

            if (!server_queue){
                
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: [],
                };
    
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                try {
                        connection = await joinVoiceChannel({
                        channelId: message.member.voice.channel.id,
                        guildId: message.guild.id,
                        adapterCreator: message.guild.voiceAdapterCreator,
                      });
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(` **${song.title}** added to queue`);
            }
        }
        else if (cmd === 'skip'){skip_song(message, server_queue);}
        else if (cmd === 'stop'){stop_song(message, server_queue);}
    },    

};

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);
        
    if(!song) {
        connection.disconnect();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });

    const player = createAudioPlayer();
    const resource = createAudioResource(stream, {inputType:StreamType.Arbitrary});
    song_queue.connection.subscribe(player);
    player.play(resource, { seek: 0, volume: 0.5 });
    console.log(player.state);
    player.on('idle', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`Now Playing **${song.title}**`);    

};

const skip_song = (message, server_queue) => {
    if(!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command.');
    if(!server_queue){
        return message.channel.send('There are no song in queue.');
    }
     server_queue.connection.dispatcher.end();
   };

   const stop_song = (message, server_queue) => {
   if(!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command.');
   server_queue.songs = [];
   console.log(server_queue.connection.dispatcher);
   server_queue.connection.dispatcher.destroy();
};
