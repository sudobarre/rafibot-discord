//const { generateDependencyReport } = require('@discordjs/voice');
//module.exports = (client) =>{
//	console.log(generateDependencyReport());
const User = require("../../schema/userSchema");
const fetch = require('node-fetch');
const Guild  = require("../../schema/guildSchema");


//const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = (client) =>{
	console.log(`Ready! Logged in as ${client.user.tag}`);
	
	function getQuote(){
		return fetch('https://zenquotes.io/api/random')
		.then(res => {
			return res.json();
		})
		.then(data => {
			return data[0]['q'] + ' -' + data[0]['a'];
		});
	}
	//send it via DM to users
	getQuote().then(quote => {
			const nothingham = client.guilds.cache.get(process.env.guildId);
			const inspiration = nothingham.channels.cache.get(process.env.inspiration);
			client.users.send(process.env.jessil, quote);
			inspiration.send(quote);

		});
	//addGuild(client);
	//addQuotes(client);
	
};
/*
const simaCatch = ['compycat', 'fucking kids', 'le gusta la vaselina','how can black be pink smh','thinks weirdass videos are funny','🥱', 'thinks kurdistan is not in iraq', 'obsessed with koreans', 'neither cute nor hot', 'yawn', 'DIE', 'die', 'ugh', 'booo👎', 'jump off a bridge', 'break your fingers', 'sabir', 'this mf', 'changes profile pic every 5 minutes'];
async function addQuotes(client){ 
	try {
		const id = process.env.simaAlt;
		const user = await User.findOne({userId : id});
		if(!user){
			const rafi = new User({
				userId: process.env.simaAlt,
				quotes: simaCatch
			});
			await rafi.save();
				return console.log("created and added quotes to user:" + rafi);
		}
		user.quotes = simaCatch;
		await user.save();
		console.log("added to existing user");
		return console.log(user);
		
    } catch (err) {
      console.log(err);
    } 
}
/*
async function addGuild(client){
	const nothingham = client.guilds.cache.get(process.env.guildId);
	const newGuild = new Guild({guildId: nothingham});
	await newGuild.save();
	const testGuild = new Guild({guildId: process.env.testId});
	await testGuild.save();

}; */
/*


const narratorCatch = ['gimme coins pls'];

const jesCatch = ['fish game', 'octopus game', 'goes shopping and ends up spending 15k', 'you have blessed hands', 'theres alot of sea in the fish', 'i think im gonna bribe the seller', 'whats the word (10 second pause) uhm.. yeahh', 'has to do makeup whenever she sees herself in the mirror'];

	
=======
	//const nothingham = client.guilds.cache.get(process.env.guildId);
	//const inspiration = nothingham.channels.cache.get('1014610979738370079');
	//inspiration.send("bruh -Aysan, 2022");
	
        function getQuote(){
            return fetch('https://zenquotes.io/api/random')
            .then(res => {
                return res.json();
            })
            .then(data => {
                return data[0]['q'] + ' -' + data[0]['a'];
            });
        }
        //send it via DM to users
        getQuote().then(quote => {
				const nothingham = client.guilds.cache.get(process.env.guildId);
				const inspiration = nothingham.channels.cache.get(process.env.inspiration);
				client.users.send(process.env.jessil, quote);
				inspiration.send(quote);

			});
	/*
	const channel = client.channels.cache.get('917842350720561173');
	function delay(n){
		return new Promise(function(resolve){
			setTimeout(resolve,n*1000);
		});
	}
	async function scare(){
		for(let i = 0; i<5; i++){
			const connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			});
			await delay(1);
			connection.disconnect();
			await delay(3);
		}
	}
	scare();
>>>>>>> main
	*/



