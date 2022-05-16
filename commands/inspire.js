const fetch = require('node-fetch');

module.exports = {
    name : 'inspire',
    once: true,
    description : 'send a motivational quote',
    async execute(client, message, cmd, args){
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
        getQuote().then(quote => message.reply(quote));
    },

};
