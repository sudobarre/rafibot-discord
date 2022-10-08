const Guild = require("../../schema/guildSchema");

module.exports = (guild) =>{
	console.log(`Joined a new guild: ` + guild);
    const newbie = new Guild({guildId: guild.id});
    newbie.save(function (err) {
        if (err) return console.log("error saving guild to db:" + err);
      });
    console.log('Saved new guild.');
    //add all users to db
}