//const { generateDependencyReport } = require('@discordjs/voice');
//module.exports = (client) =>{
//	console.log(generateDependencyReport());
const User = require("../../schema/userSchema");


const fetch = require('node-fetch');
const { Schema } = require("mongoose");

//const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = (client) =>{
	console.log(`Ready! Logged in as ${client.user.tag}`);
	//removeUser(client);
	//addUser(client);
	
};
/*
const rafiCatch =  [
    'has been called the Albert Einstein of our generation',
    'a sex symbol',
    '🧉' ,
    'a literal god',
    'omg he is sooooooo hot i cant',
    'is he the Pokemon Legend?!?!',
    'mate >>>>> coffee',
    'legends say he hasnt lost a single match in plato',
    'if George Clooney and Brad Pitt had a kid',
  ];
	async function addUser(client){
    try {
		const rafi = new User({
			userId: process.env.rafiAlt,
			quotes: rafiCatch
		});
		await rafi.save();
		console.log("added rafiAlt");
		const user = await User.findOne({userId: process.env.rafiAlt});
		return console.log(user);
		
    } catch (err) {
      console.log(err);
    } 
	};



	/*
	async function removeUser(client){
    try {
		const user = await userSchema.findOneAndRemove({userId: process.env.rafiAlt});
		return console.log("borrado");
		
    } catch (err) {
      console.log(err);
    } 
	}; */

/*
	async function removeUser(client){
		try {
			const user = await User.findOne({userId: process.env.rafiAlt});
			user.playlists = [];
			await user.save();
			return console.log("borradas playlists");
			
		} catch (err) {
		  console.log(err);
		} 
		}; */
/*
const guild = await client.guilds.cache.get(process.env.testId);
		const channel = await guild.channels.cache.get("971480144747323404"); //the channel where the msg is
		const msg = await channel.messages.fetch("1022268687471890482");
		const member = await guild.members.cache.get(process.env.rafiAlt); //create a mention from an id from the .env
		for(let i = 0; i < rafiCatch.length; i++){
			let item = [[rafiCatch[i]]];
			const tag = member.toString();
			let arg = [tag].concat(item);
			await command.execute(client, msg, command, arg);
			const id = await userSchema.findOne({userId: process.env.rafiAlt});
			console.log(id);
		}
const rafiCatch =  [
    'has been called the Albert Einstein of our generation',
    'a sex symbol',
    '🧉' ,
    'a literal god',
    'omg he is sooooooo hot i cant',
    'is he the Pokemon Legend?!?!',
    'mate >>>>> coffee',
    'legends say he hasnt lost a single match in plato',
    'if George Clooney and Brad Pitt had a kid',
  ]
const aysanCatch = ['gets depressed when cat leaves for a day', 'cat slave','commits suicide at brawlbots', 'only wins at minesweeper from forfeits','doesnt know how to checkmate', ';;p la vie en rose emily watts', 'pat pat', 'aww', 'bush', 'm!p tamino habibi', 'hey guys i just invited this dude that i talked to just once he seems nice and totally not homophobe hihi', 'cooooool', 'today i will study', 'pija', 'your lips my lips apocalypse'];
const ardCatch = ['talks to himself', 'good and you?', 'yo', 'sucks at chess', '3k wins on plato but still sucks', 'chooses pikachu over raccoon', 'game?', 'hello', 'hi', 'i just watched this new anime that totally looks like hentai but its not i swear', 'that fucking racoon', 'fucking winklit', 'kim jong un'];
const mayerCatch = ['m!p computer blue', 'who the fuck is bb king', 'idk lmao he never talks'];
const funCatch = ['thanks man', 'bankroll?','yo', 'ZzzZZzZzzZzZzz...'];
const narratorCatch = ['gimme coins pls'];
const ryanCatch = ['hi cute', '^^roulette wife for the day', 'interesting', 'oh'];

const jesCatch = ['fish game', 'octopus game', 'goes shopping and ends up spending 15k', 'you have blessed hands', 'theres alot of sea in the fish', 'i think im gonna bribe the seller', 'whats the word (10 second pause) uhm.. yeahh', 'has to do makeup whenever she sees herself in the mirror'];


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
	//createUser(process.env.sima); //that was rafibot, add the others manually
	



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
			*/
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
	*/



//<TextChannel>.lastMessage.content
//  var ticketnumber = channel.lastmessage.id
//message.createdTimestamp
//message.channel.messages.fetch({limit: x})
//const user = <client>.users.cache.get('<id>');
//user.send('<content>');

//const job = nodeCron.schedule("* * * * * *", function jobYouNeedToExecute() {
	// Do whatever you want in here. Send email, Make  database backup or download data.
//	console.log(new Date().toLocaleString());
//  });
