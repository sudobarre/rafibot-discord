//const { generateDependencyReport } = require('@discordjs/voice');
//module.exports = (client) =>{
//	console.log(generateDependencyReport());
const userSchema = require("../../schema/userSchema");

const fetch = require('node-fetch');

//const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = (client) =>{
	console.log(`Ready! Logged in as ${client.user.tag}`);
	/*
	setQuotes(client);

	
	async function setQuotes(client){
		const command = client.commands.get("addquote")
    try {
		for(let i = 0; i < simaCatch.length; i++){
			let item = [[simaCatch[i]]];
			const guild = await client.guilds.cache.get(process.env.testId);
			const channel = await guild.channels.cache.get("971480144747323404"); //the channel where the msg is
    		const msg = await channel.messages.fetch("1020398596253814814");
			const member = await guild.members.cache.get(process.env.sima); //create a mention from an id from the .env
			const tag = member.toString();
			let arg = [tag].concat(item);
			await command.execute(client, msg, command, arg);
		}
      	
    } catch (err) {
      console.log(err);
    } */
	};

	

/*
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
