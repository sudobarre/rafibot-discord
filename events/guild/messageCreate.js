const inspire = require("../../commands/inspire");
const sadWords=['sad', 'depressed', 'unhappy', 'angry', 'crying', 'annoyed'];
module.exports = (client, Discord, message) => {
	const prefix = '-rafi ';
	//message.channel.send("try me bush");
	if (message.author.bot) return;
	//Fede B's id = '228837379165650946'
	if(sadWords.some(word=>message.content.includes(word))){
		inspire.execute(client, message);
	}
	if(!message.content.startsWith(prefix)){ 
		if((message.author.id === '389046536480227328' || message.author.id === '900735891448946698')){//if its sima
			if(message.channel.id === '934083507502854165' && message.attachments.size > 0 && Math.random() < 0.8){message.reply('Stop sending weirdass videos');} //if videos channel 
			else if(Math.random() < 0.05){
				message.reply('die');
				}
			} 
			else if(message.author.id == '276060004262477825' || message.author.id == '159985870458322944' || message.author.id == '408785106942164992' || message.author.id == '172002275412279296'){ //if its a music bot then nah
				message.reply('stfu bot');
		} else if((message.author.id === '945299818438328350')){ //aysan
			if(message.channel.id === '932389999003971594' && message.attachments.size > 0){ //if its a pic on irl pics
				if(Math.random() < 0.5){
					message.react('🫀');
				} else {
					message.react('💯');
				}
			}
			if(Math.random()<0.05){
				if(Math.random() < 0.3){
					message.react('🇳');
					message.react('🇮');
					message.react('🇨');
					message.react('🇪');
					message.react('🇱');
					message.react('🇦');
					message.react('🇩');
					message.react('🇾');
				} else {
					message.react(`🇧`);
					message.react(`🇮`);
					message.react(`🇹`);
					message.react(`🇨`);
					message.react(`🇭`);
		}}}else if((message.author.id === '702969424822665419') && Math.random()<0.05){ //ard
			if(Math.random() < 0.4){
				message.react('🇵');
				message.react('🇮');
				message.react('🇰');
				message.react('🇦');
				message.react('🇨');
				message.react('🇭');
				message.react('🇺');
			}else{
			message.react('🦝');
		}
	}else if((message.author.id === '228837379165650946' || message.author.id === '715294709886746645' ) && Math.random()<0.05){ //rafi
			message.react('💯');
		}
		if(message.content.includes('hentai') || message.content.includes('porn')){
			message.react('🍑');
		}
		if(message.content.includes('dick') || message.content.includes('pija')){
			message.react('🍆');
		} 
		if(message.content.includes('mate')){
			message.react('🧉');
		}
		if(message.content.toLowerCase().startsWith('whats') || message.content.toLowerCase().startsWith(`what is`)|| message.content.toLowerCase().startsWith(`what's`)){//message.content.startsWith('Whats') || message.content.startsWith('What is') || message.content.startsWith(`what's`)|| message.content.startsWith(`What's`) ){
			message.reply('Nothing much sugar whats the matter with you');
			message.channel.send('gottem');
		}
	}else{
	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
	if(command) command.execute(client, message, cmd, args, Discord);
	}
};
