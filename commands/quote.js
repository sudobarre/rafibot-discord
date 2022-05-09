
const simaCatch = ['DIE', 'die', 'ugh', 'booo👎', 'jump off a bridge', 'break your fingers', 'sabir', 'this mf', 'changes profile pic every 5 minutes'];
const aysanCatch = [';;p la vie en rose emily watts', 'pat pat', 'aww', 'bush', 'm!p tamino habibi', 'hey guys i just invited this dude that i talked to just once he seems nice and totally not homophobe hihi', 'cooooool', 'today i will study', 'pija', 'your lips my lips apocalypse'];
const ardCatch = ['game?', 'hello', 'hi', 'i just watched this new anime that totally looks like hentai but its not i swear', 'that fucking racoon', 'fucking winklit'];
const mayerCatch = ['m!p computer blue', 'who the fuck is bb king', 'idk lmao he never talks'];
const funCatch = ['ZzzZZzZzzZzZzz...'];
const narratorCatch = ['gimme coins pls'];
const ryanCatch = ['^^roulette wife for the day', 'interesting'];
const rafiCatch= ['🧉', 'omg he is sooooooo hot i cant', 'is he the Pokemon Legend?!?!', 'mate >>>>> coffee', 'legends say he hasnt lost a single match in plato'];

module.exports = {
    name: 'quote',
    once: true,
    description : 'send a catchphrase from a guild member',
    async execute(client, message, args){
        const guild = client.guilds.cache.get('971480143870722149');
        const catchphrases = new Map(); //map has (id, [catchphrases])
        guild.members.cache.forEach(member => catchphrases.set(member.user.id, ['who dat lol'])); //could use discriminator
        //set the corresponding catchphrases to each member id
        catchphrases.set('945299818438328350', aysanCatch);
        catchphrases.set('702969424822665419', ardCatch);
        catchphrases.set('715294709886746645', rafiCatch);
        catchphrases.set('228837379165650946', rafiCatch);
        catchphrases.set('954396693846175805', funCatch);
        catchphrases.set('911572634129555496', mayerCatch);
        catchphrases.set('283123299817357312', narratorCatch);
        catchphrases.set('751537919965265970', ryanCatch);
        catchphrases.set('900735891448946698', simaCatch);
        catchphrases.set('389046536480227328', simaCatch);
        
        //check if the args[0] is equal to either sima, aysan, fun, ard, rafi, ryan
        switch(args[0]){
            case 'fun':
                message.reply(funCatch[Math.floor(Math.random() * funCatch.length)]);
                return;
            case 'rafi':
                message.reply(rafiCatch[Math.floor(Math.random() * rafiCatch.length)]);
                return;
            case 'ryan':
                message.reply(ryanCatch[Math.floor(Math.random() * ryanCatch.length)]);
                return;
            case 'aysan':
                message.reply(aysanCatch[Math.floor(Math.random() * aysanCatch.length)]);
                return;
            case 'ice':
                message.reply(aysanCatch[Math.floor(Math.random() * aysanCatch.length)]);
                return;
            case 'icesun':
                message.reply(aysanCatch[Math.floor(Math.random() * aysanCatch.length)]);
                return;
            case 'mayer':
                message.reply(mayerCatch[Math.floor(Math.random() * mayerCatch.length)]);
                return;
            case 'ard':
                message.reply(ardCatch[Math.floor(Math.random() * ardCatch.length)]);
                return;
            case 'sima':
                message.reply(simaCatch[Math.floor(Math.random() * simaCatch.length)]);
                return;
            default:
                break;
        }
        //transform the args[0] into an id
        const memberData = guild.members.cache.find(member => member.user.username === args[0]);
        if(!memberData){
            message.reply('Could not find the dude u are looking for. Please enter the full username!');
            return;
        }

        
        const quote = catchphrases.get(memberData.id); //should return an array containing the catchphrases        
        const randomIndex = Math.floor(Math.random() * quote.length);
        const item = quote[randomIndex];
        message.reply(item);
    },
};
