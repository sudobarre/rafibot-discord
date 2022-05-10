const inspire = require("../../commands/inspire");
const sadWords=['sad', 'depressed', 'unhappy', 'angry'];
module.exports = (client, Discord, message) => {
	const prefix = '-rafi ';
	if (message.author.bot) return;
	//Fede B's id = '228837379165650946'
	//could declare an object with peoples names and id's and associate them to an array of common catchphrases
	if(sadWords.some(word=>message.content.includes(word))){
		inspire.execute(client, message);
	}
	if(!message.content.startsWith(prefix)){ 
		if((message.author.id === '389046536480227328' || message.author.id === '900735891448946698') && (Math.random() < 0.1)){ //if its sima
		message.channel.send('die');
		}else if(message.author.id == '276060004262477825' || message.author.id == '159985870458322944' || message.author.id == '408785106942164992' || message.author.id == '172002275412279296'){ //if its a music bot then nah
			message.reply('stfu bot');
		} else if((message.author.id === '945299818438328350') && Math.random()<0.1){
			message.react(`🇧`);
			message.react(`🇮`);
			message.react(`🇹`);
			message.react(`🇨`);
			message.react(`🇭`);
		}else if((message.author.id === '702969424822665419') && Math.random()<0.1){
			message.react('🦝');
		}else if((message.author.id === '228837379165650946') && Math.random()<0.1){
			message.react('💯');
		}
		if(message.content.includes('hentai') || message.content.includes('porn')){
			message.react('🍑');
		} 
	}
	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	const command = client.commands.get(cmd);
	if(command) command.execute(client, message, args, Discord);
	};
