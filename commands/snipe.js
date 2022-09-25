const {MessageEmbed} = require("discord.js");
const snipeSchema = require("../schema/snipeSchema.js");


module.exports = {
	name :'snipe',
	description: 'Returns last deleted message, if there was one.',
	once: true,
	async execute(client, message, cmd, args, Discord) {
		let data = await snipeSchema.findOne({channelId: message.channel.id});
        if(!data){
            message.reply("No messages have been deleted recently.");
        }

        const embed = new Discord.MessageEmbed()
        .setTitle(`Deleted message from ${data.author}`)
        .setDescription(`${data.message}`)
        .setColor("RANDOM")
        .addField("Channel: ", `<#:${data.channelId}>`, true)
        .addField("Time: ", `<t:${data.time}:R>`)
        .setTimestamp();
        
        message.reply({embeds: [embed]});
	},
};
