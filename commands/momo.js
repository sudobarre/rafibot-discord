const Discord = require('discord.js');
const a = require('shinobu-memes');
//const { execute } = require('./play');

module.exports = {
    name: 'momo',
    description: 'a random spanish meme from shinobu-memes.',
    once: true,
    async execute(client, message, cmd, args){
        const meme = a.Shinobumemes();
        const embedmeme = new Discord.MessageEmbed()
        //.setTitle("Meme!")
        .setImage(meme)
        .setColor("RANDOM")
        .setTimestamp();
    message.channel.send({ embeds: [embedmeme] });
    },
};