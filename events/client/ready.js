//const { generateDependencyReport } = require('@discordjs/voice');
//module.exports = (client) =>{
//	console.log(generateDependencyReport());
const fetch = require('node-fetch');


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
		var checkminutes = 1440, checkthe_interval = checkminutes * 60 * 1000; //This checks every n minutes.
        getQuote().then(quote => 
			setInterval(function() {
				client.users.send(process.env.rafi, quote);
				client.users.send(process.env.rafiAlt, quote);
				client.users.send(process.env.aysan, quote);
				client.users.send(process.env.jessil, quote);
			}, checkthe_interval));
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
