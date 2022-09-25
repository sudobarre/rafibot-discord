const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Discord = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus, NoSubscriberBehavior } = require('@discordjs/voice');
const { Client, Message, MessageEmbed, GatewayIntentBits } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { query } = require('express');
const { Player } = require('discord-player');

let connection;
const queue = new Map();

function shuffleArray(array) { //usage: arr = shuffleArray(arr); to use with flagint == 1
    let curId = array.length;
    // There remain elements to shuffle
    while (curId!==0) {
      // Pick a remaining element
      const randId = Math.floor(Math.random() * curId);
      curId -= 1;
      // Swap it with the current element.
      const tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }
// queue (message.guild.id, queue_constructor object { voice channel, text channel, connection, song[]});

//for the interaction a shuffled array containing the songs should be passed through the args arr and all the songs should be queued up at once.
//If there is an existing queue it should clear it up first; by deleting every song except the last one and start queuing up the playlist.
//Afterwards the skip promise is executed so all gucci 

module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop', 'queue', 'pause', 'unpause'], //add shuffle, play alias for interaction play
    description: 'plays music',
    async execute(client, message, cmd, args, Discord, flagint){
        if(!(flagint)){ //if its an odd number it will skip this. Used with interactions
            var voice_channel = message.member.voice.channel;
            if (!voice_channel) return message.channel.send('You need to be in a voice channel to execute this command.');
            const permissions = voice_channel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) return message.channel.send('You dont have permission to do that');
            if (!permissions.has('SPEAK')) return message.channel.send('You dont have permission to do that');
        }

        const server_queue = (!flagint) ? queue.get(message.guild.id) : queue.get(message.guildId); //AFTER INTERACTION

        //if bot is already playing then the silence shouldnt queue up.

        if (cmd === 'play' || cmd === 'p') {
            if (!args.length) return message.reply('You need to send the title or a url as an argument!');
            let song = {};

            if(flagint){ //used to treat the args as array of arrays including songs instead of a 1-D array. Need to clear up queue if called when it already has stuff playing or nah idk lol
                const n = server_queue.songs.length;
                for(let i = 0; i < n-1; i++){
                    server_queue.songs.shift();
                }
                shuffleArray(args);

                //if there is already a queue with >1 songs then free up the queue and push the new selection.

                for(let i = 0; i < args.length; i++){
                    if (ytdl.validateURL(args[i][0])){ //if its a link then the arg[i] is just one element in size.
                        const song_info = await ytdl.getInfo(args[i][0]);
                        song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url };
                        server_queue.songs.push(song);

                    } else {
                    //If the video is not a URL then use keywords to find that video.
                    //if its a dark academia song then push a random video from the songs searched.
                        var video_finder = async (query) =>{ //query may be wrong here idk
                            const videoResult = await ytSearch(query);
                            //could just return all the videos but i have to make sure to pass on the artist name instead of a song.
                            if(query !== "dark academia"){
                                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null; //returns a random video from the searched keyword
                            }else{
                                return (videoResult.videos.length > 1) ? videoResult.videos[Math.floor(Math.random() * (videoResult.videos.length/2))] : null;
                            }
                        };
                       
                        const video = await video_finder(args[i].join(' '));
                        //console.log(video);
                        if (video){
                            song = { title: video.title, url: video.url };
                            server_queue.songs.push(song);
                        } else {
                            message.reply('Error finding your video.');
                            //return;
                        }
                    }
                }
            }else{

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
                    return (!flagint) ? message.reply(`**${song.title}** Added to queue!\n${song.url}`) : console.log('added to queue');
                }
            }
        }
        else if (cmd === 'skip'){skip_song(message, server_queue, flagint);}
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


const video_player = async (guild, song, flagint, paused) => {
    const song_queue = (!flagint) ? queue.get(guild.id) : queue.get(guild);
        
    if(!song) {
        connection.disconnect();
        (!flagint) ? queue.delete(guild.id) : queue.delete(guild); //if called by interaction then the guild id is in guild itself.
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
        video_player(guild, song_queue.songs[0], flagint); //is it flagint?
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
    if(flagint !== 0){ //if called by interaction then there is a song queued up already.
        server_queue.songs.shift();
        return video_player(message.guildId, server_queue.songs[0], 1);
    }else{
        if(!message.member.voice.channel) return message.reply('You need to be in a channel to execute this command.');
        if(!server_queue || server_queue.songs.length === 1){
            message.reply('There are no songs left in queue. Leaving voice channel...');
            queue.delete(message.guild.id);
            connection.disconnect();
            return;
        }
    }
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
