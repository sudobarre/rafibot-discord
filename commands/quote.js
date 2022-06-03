require('dotenv').config();
const simaCatch = ['le gusta la vaselina','how can black be pink smh','thinks weirdass videos are funny','🥱', 'thinks kurdistan is not in iraq', 'obsessed with koreans', 'neither cute nor hot', 'yawn', 'DIE', 'die', 'ugh', 'booo👎', 'jump off a bridge', 'break your fingers', 'sabir', 'this mf', 'changes profile pic every 5 minutes'];
const aysanCatch = ['gets depressed when cat leaves for a day', 'cat slave','commits suicide at brawlbots', 'only wins at minesweeper from forfeits','doesnt know how to checkmate', ';;p la vie en rose emily watts', 'pat pat', 'aww', 'bush', 'm!p tamino habibi', 'hey guys i just invited this dude that i talked to just once he seems nice and totally not homophobe hihi', 'cooooool', 'today i will study', 'pija', 'your lips my lips apocalypse'];
const ardCatch = ['talks to himself', 'good and you?', 'yo', 'sucks at chess', '3k wins on plato but still sucks', 'chooses pikachu over raccoon', 'game?', 'hello', 'hi', 'i just watched this new anime that totally looks like hentai but its not i swear', 'that fucking racoon', 'fucking winklit', 'kim jong un'];
const mayerCatch = ['m!p computer blue', 'who the fuck is bb king', 'idk lmao he never talks'];
const funCatch = ['thanks man', 'bankroll?','yo', 'ZzzZZzZzzZzZzz...'];
const narratorCatch = ['gimme coins pls'];
const ryanCatch = ['hi cute', '^^roulette wife for the day', 'interesting'];
const rafiCatch= ['has been called the Albert Einstein of our generation','a sex symbol', '🧉','a literal god', 'omg he is sooooooo hot i cant', 'is he the Pokemon Legend?!?!', 'mate >>>>> coffee', 'legends say he hasnt lost a single match in plato', 'if George Clooney and Brad Pitt had a kid'];

const jesCatch = ['theres alot of sea in the fish', 'i think im gonna bribe the seller', 'whats the word (10 second pause) uhm.. yeahh', 'has to do makeup whenever she sees herself in the mirror'];

module.exports = {
    name: 'quote',
    aliases: ['q'],
    once: true,
    description : 'send a catchphrase from a guild member',
    async execute(client, message, cmd, args){
        const guild = message.guild;//client.guilds.cache.get(process.env.guildId);
        const catchphrases = new Map(); //map has (id, [catchphrases])
        guild.members.cache.forEach(member => catchphrases.set(member.user.id, ['who dat lol'])); 
        //set the corresponding catchphrases to each member id
        catchphrases.set(process.env.aysan, aysanCatch);
        catchphrases.set(process.env.ard, ardCatch);
        catchphrases.set(process.env.rafi, rafiCatch);
        catchphrases.set(process.env.rafiAlt, rafiCatch);
        catchphrases.set(process.env.fun, funCatch);
        catchphrases.set(process.env.mayer, mayerCatch);
        catchphrases.set(process.env.narrator, narratorCatch);
        catchphrases.set(process.env.ryan, ryanCatch);
        catchphrases.set(process.env.sima, simaCatch);
        catchphrases.set(process.env.simaAlt, simaCatch);

        catchphrases.set(process.env.jessil, jesCatch);
        
        function getUserFromMention(mention) {
            if (!mention) return;
        
            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);
        
                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
        
                return client.users.cache.get(mention);
            }
        }
        
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
            case 'sun':
                message.reply(aysanCatch[Math.floor(Math.random() * aysanCatch.length)]);
                return;
            case 'icesun':
                message.reply(aysanCatch[Math.floor(Math.random() * aysanCatch.length)]);
                return;
            case 'angel':
                message.reply(aysanCatch[Math.floor(Math.random() * aysanCatch.length)]);
                return;
            case 'bitch':
                message.reply(simaCatch[Math.floor(Math.random() * simaCatch.length)]);
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
        args[0] = getUserFromMention(args[0]); //turns the mention into an id
        if(!args[0]) {
            message.reply('Could not find the dude u are looking for. Please type the full username!');
            return;
        }
        const memberData = guild.members.cache.find(member => member.user.id === args[0].id);
        if(!memberData){
            message.reply('Could not find the dude u are looking for. Please type the full username!');
            return;
        }

        const quote = catchphrases.get(memberData.id); //should return an array containing the catchphrases        
        const randomIndex = Math.floor(Math.random() * quote.length);
        const item = quote[randomIndex];
        message.reply(item);
    },
};