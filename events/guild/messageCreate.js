const inspire = require("../../commands/inspire");
const sadWords = ["angry", "crying", "annoyed"];
require("dotenv").config();

module.exports = (client, Discord, message) => {
  const prefix = process.env.PREFIX;
  if (message.author.bot) return;
  const msg = message.content.toLowerCase();
  if (sadWords.some((word) => message.content.includes(word))) {
    inspire.execute(client, message);
  }
  if (!msg.startsWith(prefix)) {
    if (msg.includes("hentai") || msg.includes("porn")) {
      message.react("🍑");
    }
    if (msg.includes("dick") || msg.includes("pija")) {
      message.react("🍆");
    }
    if (msg.includes("feet")) {
      message.react("🦶");
    }
    if (msg.includes("mate")) {
      message.react("🧉");
    }
    if (msg.includes("coffee")) {
      message.react("⬆️");
      message.react("🤢");
      message.react("➡️");
      message.react("🧉");
      message.react("💯");
    }
    /*if (
      msg.startsWith("whats a") ||
      msg.startsWith(`what is`) ||
      msg.startsWith(`what's`)
    ) {
      message.reply("Nothing much sugar whats the matter with you");
      message.channel.send("gottem");
    }*/
    switch (message.author.id) {
      case process.env.sima:
        if (
          message.channel.id === process.env.videos &&
          message.attachments.size > 0 &&
          Math.random() < 0.5
        ) {
          message.channel.send("Stop sending weirdass stuff");
        } else if (Math.random() < 0.01) {
          message.reply("die");
        }
        break;
      case process.env.simaAlt:
        if (
          message.channel.id === process.env.videos &&
          message.attachments.size > 0 &&
          Math.random() < 0.5
        ) {
          message.channel.send("Stop sending weirdass stuff");
        } else if (Math.random() < 0.01) {
          message.reply("die");
        }
        break;
      case process.env.aysan:
        if (
          message.channel.id === process.env.pics &&
          message.attachments.size > 0
        ) {
          Math.random() < 0.5 ? message.react("🫀") : message.react("💯");
        }
        if (Math.random() < 0.01) {
          message.react("🇳");
          message.react("🇮");
          message.react("🇨");
          message.react("🇪");
          message.react("🇱");
          message.react("🇦");
          message.react("🇩");
          message.react("🇾");
        }
        break;
      case process.env.ard:
        if (Math.random() < 0.01) {
          message.react("🦝");
        }
        break;
      case process.env.rafi:
        if (Math.random() < 0.01) {
          message.react("💯");
        }
        break;
      case process.env.rafiAlt:
        if (Math.random() < 0.01) {
          message.react("💯");
        }
        break;
      case process.env.moBitch:
        if(Math.random() < 0.01){
          message.react('🇧');
          message.react('🇮');
          message.react('🇹');
          message.react('🇨');
          message.react('🇭');
        }
        break;
        case process.env.ryan: 
            if(message.content.includes("cutie")){
            message.reply("🥱");
          }
          break;
          
      default:
        break;
    }
  } else { 
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command =
      client.commands.get(cmd) ||
      client.commands.find((a) => a.aliases && a.aliases.includes(cmd));
    try {
      const flagint = 0; //ugly way to work with interactions in some commands.
      command.execute(client, message, cmd, args, Discord, flagint);
    } catch (err) {
      message.reply("There was an error trying to execute this command. Make sure to type the command correctly!");
      console.log(err);
    }
  }
};
