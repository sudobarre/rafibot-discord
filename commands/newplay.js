
module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop', 'queue', 'pause', 'unpause', ], //add shuffle, play alias for interaction play
    description: 'plays music',
    async execute(client, message, cmd, args, Discord, flagint){
        //                                          int = 0                     int = 1
        const server_queue =  queue.get(message.guild.id);

        //if bot is already playing then the silence shouldnt queue up.

        if (cmd === 'play' || cmd === 'p') { //(client, interaction, "play", songs, Discord, 1) for interactions
            if (!args.length) return message.reply('You need to send the title or a url as an argument!');
            let song = {};
                if (ytdl.validateURL(args[0])){
                    const song_info = await ytdl.getInfo(args[0]);
                    song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url };

                } else {
                    //If the video is not a URL then use keywords to find that video.
                    const video_finder = async (query) =>{
                        const videoResult = await ytSearch(query);
                        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null; //gets the first result in the search of that keyword

                    };

                    const video = await video_finder(args.join(' '));
                    if (video){
                        song = { title: video.title, url: video.url };
                    } else {
                        message.reply('Error finding your video.');
                        return;
                    }
                }
                if (!server_queue){ // interaction already has one, goes to else   
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
                        message.reply('There was an error connecting.');
                        throw err;
                    }
                } else{ //there is a server queue, interaction would enter here.
                    if(args[0] === 'https://www.youtube.com/watch?v=r6-cbMQALcE') return; //if songs is invoked while there is music playing ignore the silence.
                    server_queue.songs.push(song);
                    return message.reply(`**${song.title}** Added to queue!\n${song.url}`);
                }

        }                            //(client, message,      cmd,   args,  Discord, flagint) for regular
        else if (cmd === 'bazinga'){ //(client, interaction, "play", songs, Discord,    1) for interactions
            //already has a queue queued up.
            const server_queue = queue.get(message.guildId); //AFTER INTERACTION
            const n = server_queue.songs.length;
            for(let i = 0; i < n-1; i++){ //in case someone calls the songs cmd while there are songs already queued up.
                server_queue.songs.shift();
            }
            shuffleArray(args);
            //if there is already a queue with >1 songs then free up the queue and push the new selection.

            for(let i = 0; i < args.length; i++){ //songs already validated when added.
                const song_info = await ytdl.getInfo(args[i][0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url };
                server_queue.songs.push(song);
            }
        }
        else if (cmd === 'skip'){skip_song(message, server_queue);}
        else if (cmd === 'stop'){stop_song(message, server_queue);}
        else if (cmd === 'pause'){pause_song(message, server_queue);}
        else if (cmd === 'unpause'){pause_song(message, server_queue);}
        else if (cmd === 'queue'){print_queue(message, server_queue);}

    },    

};

const pause_song = (message, server_queue) => {
    if(!message.member.voice.channel) return message.reply('You need to be in a channel to execute this command.');
    return video_player(message.guildId, server_queue.songs[0], 1, 1);
   };


const video_player = async (guild, song, paused) => {
    const song_queue = queue.get(guild.id);
        
    if(!song) {
        connection.disconnect();
        queue.delete(guild.id); //if called by interaction then the guild id is in guild itself.
        return;
    }
    const stream = ytdl(song.url, {
        filter: "audioonly",
        fmt: "mp3",
        highWaterMark: 1 << 62,
        liveBuffer: 1 << 62,
        dlChunkSize: 0, //disabling chunking is recommended in discord bot
        bitrate: 128,
        quality: "lowestaudio",
   });

    
    const player = createAudioPlayer();
    if(paused){
       player.pause();
       return await song_queue.text_channel.send('FUCKING PAUSE BRO');
    } 
    const resource = createAudioResource(stream, {inputType:StreamType.Arbitrary});
    song_queue.connection.subscribe(player);
    player.play(resource, { seek: 0, volume: 0.5 });
    player.on('idle', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]); //is it flagint?
    });
    if(song.url !== 'https://www.youtube.com/watch?v=r6-cbMQALcE' && song.url !== 'https://www.youtube.com/watch?v=A3ytTKZf344'){ //if its not silence or sexy music
        await song_queue.text_channel.send(`Now Playing: **${song.title}\n**${song.url}`);  
    }
    player.on('disconnect', () => {
        queue.delete(guild.id);
        song_queue.text_channel.send(`A bitch disconnected me, cleared songs queue.`); 
    });

};

const skip_song = (message, server_queue, flagint) => {
   /* if(flagint !== 0){ //if called by interaction then there is a song queued up already.
        server_queue.songs.shift();
        return video_player(message.guildId, server_queue.songs[0], 1);
    }else{ */
        if(!message.member.voice.channel) return message.reply('You need to be in a channel to execute this command.');
        if(!server_queue || server_queue.songs.length === 1){
            message.reply('There are no songs left in queue. Leaving voice channel...');
            queue.delete(message.guild.id);
            connection.disconnect();
            return;
        }
    //}
    server_queue.songs.shift();
    video_player(message.guild, server_queue.songs[0]);

   };

   const stop_song = (message, server_queue) => {
   if(!message.member.voice.channel) return message.reply('You need to be in a channel to execute this command.');
   server_queue.songs = [];
   queue.delete(message.guild.id);
   connection.disconnect();
   return message.reply('Player has been stopped and queue has been cleared. Leaving voice channel...');
};

const print_queue = (message, server_queue) => {
    if(!server_queue) return message.reply('There are no songs remaining in the queue.');
    const songs = server_queue.songs;
    const embed = new Discord.MessageEmbed()
            .setColor('#75BB67')
            .setTitle('Songs');

    embed.addFields({name: (`Current:`), value: (`${songs[0].title}\n${songs[0].url}`)});

    for(let i = 1; i < server_queue.songs.length; i++){
        embed.addFields({name: (`Position ${(i+1).toString()}:`), value: (`${songs[i].title}\n${songs[i].url}`)});  
    }
    message.reply({ embeds: [embed] });
};
