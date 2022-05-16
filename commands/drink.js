const drinkingAccidents = ['Oh dear! When trying to drink from the straw you missed and poked your eye and died from blood loss!', 'Oh dear! The water was above 80 degrees and you ended up burning all your insides!', 'Oh dear! While drinking your delicious mate a cow fell from the sky and squished you to death!', 'Oh dear! You got abducted by aliens as you were taking a sip from your mate!', 'Oh dear! You got ran over by a tractor as you were about to drink your delicious mate!', 'Oh dear! As you finished drinking your mate the surviving bacteria that your soap couldnt eliminate came back to seek revenge and gave you coronavirus! You died!'];
module.exports = {
	name :'drink',
	description: 'drinks mate at a 20% chance to have something lethal happen to you! FYI this wasnt my idea',
	once: true,
	async execute(client, message, cmd, args) {
        const res = Math.random();
        if(res < 0.2){
            const randomIndex = Math.floor(Math.random() * drinkingAccidents.length);
            const item = drinkingAccidents[randomIndex];
            message.reply(item);
        } else {
            message.reply('You drink from your delicious mate. It tastes like mate. I dont know what else you expected from it.');
        }
	},
};
