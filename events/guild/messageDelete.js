const snipeSchema = require("C:/Users/svgra/Documents/Coding/disc-bot/schema/snipeSchema.js");

async function snipe(message){
    let data = await snipeSchema.findOne({channelId: message.channel.id});
    if(!data){
        let newData = new snipeSchema({
            channelId: message.channel.id,
            message: message.content,
            author: message.author.tag,
            time: Math.floor(Date.now()/1000)
        })
        return await newData.save();
    }

    await snipeSchema.findOneAndUpdate({
        channelId: message.channel.id,
        message: message.content,
        author: message.author.tag,
        time: Math.floor(Date.now()/1000)
    })
}

module.exports = ( client, Discord, message) => {
    snipe(message);
}