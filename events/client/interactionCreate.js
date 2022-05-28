//const messageCreate = require("../guild/messageCreate");

module.exports = (client, Discord, interaction) => {
  console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction: ${interaction}`);
  //console.log(interaction);
  //console.log(message);

  async function handleCommand() {
    if (interaction.isCommand()) {
      const slashcmd = client.slashcommands.get(interaction.commandName);
      //console.log(interaction);
      console.log(slashcmd);
      if (!slashcmd) return;

      try {
        await interaction.deferReply();
        await slashcmd.run({ client, interaction });
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command.",
          ephemeral: true,
        });
      }
    } else if (interaction.isSelectMenu()) {
      if (interaction.customId === "choose-song") {
        switch (interaction.user.id) {
          case process.env.rafiAlt:
            switch (interaction.values[0]) {
              case "Sweet dreams!":
                //sth
                console.log(interaction.commandName);
                //interaction.reply('i dont sleep lol');
                //execute()
                break;
              case "Goodluck!":
                {
                  //add dark academia to queue
                  //skip current song
                try {
                  const commandPlay = client.commands.get('play');
                  const song = ['dark', 'academia'];
                  commandPlay.execute(client, interaction, 'play', song , Discord, interaction).then(
                    function(){
                      commandPlay.execute(client, interaction, 'skip', [] , Discord, interaction);
                    },
                    function(){
                      console.log('Error.');
                    },
                  );
                  
                    //await interaction.deferReply();
                } catch (error) {
                    console.error(error);
                    await interaction.reply({
                    content: "There was an error while executing this command.",
                    ephemeral: true,
                    });
                }
                  //console.log(interaction);
                  //const command = client.commands.get("play");
                  //console.log("the command is:", command);
                  //const args = ["dark", "academia"]; //link
                  //console.log("interaction message is:", interaction.message);
                  //command.execute(client, interaction, command, args, Discord, interaction);
                }
                break;
              case "Hope you feel better :)":
                //sth
                interaction.reply("sad stuff");
                break;
              case "You have a great taste in music!":
                //sth
                interaction.reply("cool playlist");
                break;
              default:
                //sth
                break;
            }
            //sth
            break;
          case process.env.sima:
            //sth here
            switch (interaction.values[0]) {
              case "Sleeping":
                console.log("sleeping music for sima");
                break;
              case "Studying":
                //sth
                console.log("she will never study lol");
                break;

              case "Sad":
                //sth
                console.log("that spoti playlist");
                break;

              case "rafi-special":
                //sth
                break;
              default:
                //sth
                break;
            }
            break;
          case process.env.simaAlt:
            switch (interaction.values[0]) {
              case "Sleeping":
                //sth
                break;
              case "Studying":
                //sth
                break;

              case "Sad":
                //sth
                break;

              case "rafi-special":
                //sth
                break;
              default:
                //sth
                break;
            }
            //sth here
            break;
          case process.env.aysan:
            switch (interaction.values[0]) {
              case "Sleeping":
                //sth
                break;
              case "Studying":
                //sth
                break;

              case "Sad":
                //sth
                break;

              case "rafi-special":
                //sth
                break;
              default:
                //sth
                break;
            }
            //sth here
            break;
          case process.env.ard:
            switch (interaction.values[0]) {
              case "Sleeping":
                //sth
                break;
              case "Studying":
                //sth
                break;

              case "Sad":
                //sth
                break;

              case "rafi-special":
                //sth
                break;
              default:
                //sth
                break;
            }
            //yknw or sth
            break;
          default:
            //rafi is here
            break;
        }
      }
    }
  }
  handleCommand();
};
