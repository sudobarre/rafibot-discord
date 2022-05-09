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
		if(message.author.id === '228837379165650946' || message.author.id === '389046536480227328' || message.author.id === '900735891448946698'){ //if its sima
		message.channel.send('die');
		}else if(message.author.role === 'bots'){ //if its a music bot then nah
			message.channel.send('stfu bot');
		}
	}
	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	const command = client.commands.get(cmd);
	if(command) command.execute(client, message, args, Discord);
	};
//client.on('message', message =>{
	
//});