
const simaCatch = ['DIE', 'die', 'ugh', 'booo', 'jump off a bridge', 'break your fingers', 'sabir', 'this mf', 'changes profile pic every 5 minutes'];
const aysanCatch = ['pat pat', 'aww', 'bush', 'm!p tamino habibi', 'hey guys i just invited this dude that i talked to just once he seems nice and totally not homophobe hihi', 'cooooool', 'today i will study', 'pija', 'your lips my lips apocalypse'];
const ardCatch = ['game?', 'hello', 'hi', 'i just watched this new anime that totally looks like hentai but its not i swear', 'that fucking racoon', 'fucking winklit'];
const mayerCatch = ['m!p computer blue', 'who the fuck is bb king', 'idk lmao he never talks'];
const funCatch = ['ZzzZZzZzzZzZzz...'];
const narratorCatch = ['gimme coins pls'];
const ryanCatch = ['^^roulette wife for the day', 'interesting'];
//   list.members.cache.array().forEach(member => {
//       catchphrases.set(member.Id, ['who dat lol']);


module.exports = {
    name: 'quote',
    once: true,
    description : 'send a catchphrase from a guild member',
    async execute(client, message, args){
        const guild = client.guilds.cache.get('971480143870722149');
        const catchphrases = new Map();
        
        //guild.members.cache.forEach(member => catchphrases.set(member.user.username, ['who dat lol'])); 
        guild.members.cache.forEach(member => message.reply(member.user.id)); 
        //console.log(catchphrases.get(args[0]));
        message.reply(args[0]);
    },
};
