//const { generateDependencyReport } = require('@discordjs/voice');
//module.exports = (client) =>{
//	console.log(generateDependencyReport());
const fetch = require('node-fetch');


//const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = (client) =>{
	console.log(`Ready! Logged in as ${client.user.tag}`);
	//const nothingham = client.guilds.cache.get(process.env.guildId);
	//const inspiration = nothingham.channels.cache.get('1014610979738370079');
	//inspiration.send("bruh -Aysan, 2022");
	/*
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

			});*/
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
};


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
