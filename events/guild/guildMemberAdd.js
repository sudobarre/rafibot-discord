const userSchema = require("../../schema/userSchema.js");
const snipeSchema = require("../../schema/userSchema.js");

const welcome = 'Welcome to the Server! Before you can start enjoying our marvelous community you will have to answer just one question!\nWould you rather eat a baby goat or a matter baby?';

module.exports = (client, Discord, guildMember) => {
    createUser(guildMember.id);
    if(guildMember.guild.id != process.env.guildId) return;
    const welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Citizen of Nothingham');
	if(welcomeRole) guildMember.roles.add(welcomeRole);
    const channel = guildMember.guild.channels.cache.get(process.env.general);
    if (!channel) return;
    channel.send(welcome);
};



async function createUser(guildMemberId){ //dont just update, do findOne or findById and then .save
    try {
        const user = await userSchema.create({
            userId : guildMemberId,
            //rest is an empty array by default.
        });
        return await user.save();
    } catch (error) {
        console.error(error);
    }   
}
