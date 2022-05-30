const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Discord = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus, NoSubscriberBehavior } = require('@discordjs/voice');
const { Client, Message, MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { query } = require('express');

let connection;
const queue = new Map();
// queue (message.guild.id, queue_constructor object { voice channel, text channel, connection, song[]});
module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop', 'queue', 'shuffle', 'songs'],
    description: 'music bot',
    async execute(client, message, cmd, args, Discord, flagint){
        if(!(flagint%2)){
            var voice_channel = message.member.voice.channel;
            if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command.');
            const permissions = voice_channel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) return message.channel.send('You dont have permission to do that');
            if (!permissions.has('SPEAK')) return message.channel.send('You dont have permission to do that');
        }
        //console.log('message queue is:', message.guild.id + '\n');
        //console.log
        const server_queue = (!flagint) ? queue.get(message.guild.id) : queue.get(message.guildId); //AFTER INTERACTION

        if (cmd === 'play' || cmd === 'p') {
            if (!args.length) return message.reply('You need to send the title or a url as an argument!');
            let song = {};

            if (ytdl.validateURL(args[0])){
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url };

            } else {

                //If the video is not a URL then use keywords to find that video.
                const video_finder = async (query) =>{
                    const videoResult = await ytSearch(query);
                    if(!flagint){
                        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null; //gets the first result in the search of that keyword
                    } else { //flagint
                        return (videoResult.videos.length > 1) ? videoResult.videos[Math.floor(Math.random() * videoResult.videos.length )] : null; //returns a random video from the searched keyword
                    }
                   
                };

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url };
                } else {
                    message.reply('Error finding your video.');
                    return;
                }
            }

            if (!server_queue){ //i hope my interaction already has one
                
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
            } else{ //songs would enter here
                server_queue.songs.push(song);
                return (!flagint) ? message.reply(`**${song.title}** Added to queue!\n${song.url}`) : console.log('added to queue');
            }
        }
        else if (cmd === 'skip'){skip_song(message, server_queue, flagint);}
        else if (cmd === 'stop'){stop_song(message, server_queue);}
        else if (cmd === 'queue'){print_queue(message, server_queue);}
        //else if(cmd === 'shuffle'){server_queue.shuffle();}

    },    

};

const video_player = async (guild, song, flagint) => {
    const song_queue = (!flagint) ? queue.get(guild.id) : queue.get(guild);
        
    if(!song) {
        connection.disconnect();
        queue.delete(guild.id);
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
    const resource = createAudioResource(stream, {inputType:StreamType.Arbitrary});
    song_queue.connection.subscribe(player);
    player.play(resource, { seek: 0, volume: 0.5 });
    //console.log(player.state);
    player.on('idle', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0], 0);
    });
    await (!flagint) ? song_queue.text_channel.send(`Now Playing: **${song.title}\n**${song.url}`): console.log('playing music');    

};

const skip_song = (message, server_queue, flagint) => {
    if(flagint !== 0){ //if called by interaction then there is a song queued up already.
        server_queue.songs.shift();
        return video_player(message.guildId, server_queue.songs[0], 1);
    }else{
        if(!message.member.voice.channel) return message.reply('You need to be in a channel to execute this command.');
        //console.log(server_queue);
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
   return message.reply('Leaving voice channel...');
};

const print_queue = (message, server_queue) => {
    if(!server_queue) return message.reply('There are no songs remaining in the queue.');
    const songs = server_queue.songs;
    const embed = new Discord.MessageEmbed()
            .setColor('#75BB67')
            .setTitle('Songs');
    for(let i = 0; i < server_queue.songs.length; i++){
        if(!i){
            embed.addFields({name: (`Current:`), value: (`${songs[i].title}`)});
        }else{
            embed.addFields({name: (`Position ${(i+1).toString()}:`), value: (`${songs[i].title}`)});
        }
    }
    message.reply({ embeds: [embed] });
};
