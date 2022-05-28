//const messageCreate = require("../guild/messageCreate");
const mayerChill = [['john', 'mayer', 'sob', 'rock'], ['john', 'mayer', 'continuum'],['prince', 'album'], ['bb', 'king', 'album']];
const aysanChill = [['https://www.youtube.com/watch?v=kMzlN9-Db1A'], ['https://www.youtube.com/watch?v=F2EmooQ1Iag'],['emily', 'watts', 'rose'], []]
const sad = [['https://www.youtube.com/watch?v=Ic-3mudz8TA'], ['https://www.youtube.com/watch?v=BpwDFKFkpOY'], ['https://www.youtube.com/watch?v=iJzJ7d5CK4A']]
const chill = [['https://www.youtube.com/watch?v=mFErBk9HtZE'],['https://www.youtube.com/watch?v=uR3aQOgzyDU'], ['https://www.youtube.com/watch?v=npgiuricgv4']]
const sleepSongs = [['https://www.youtube.com/watch?v=cU0Wz1ez3J0']];
const simaSleep = [[]];
const sleep = [['https://www.youtube.com/watch?v=8AvUSCz_zj0'], ];
module.exports = (client, Discord, interaction) => {
  console.log(
    `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction: ${interaction}`
  );
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
        await slashcmd.run({
          client,
          interaction,
        });
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command.",
          ephemeral: true,
        });
      }
    } else if (interaction.isSelectMenu()) {
      if (interaction.customId === "choose-song") {
        switch (interaction.values[0]) {
          case "Sweet dreams!":
            switch (interaction.user.id) {
              case process.env.sima:
                //rina sawayama or boring stories or lpda or my piano music
                break;
              case process.env.simaAlt:
                //same thing lol
                break;
              case process.env.aysan:
                //la vie en rose, or dark academia or my piano playlist or blue moon idk
                break;
              default:
                //my songs, piano music could be idk
                break;
            }
            //users i guess
            break;
          case "Good luck!":
            switch (interaction.user.id) {
              case process.env.rafiAlt:
                //play pokemon or undertale or one of those lol
                break;
              case process.env.rafi:
                //same thing lol
                break;
              default: //dark academia
              {
                //add dark academia to queue
                //skip current song
                try {
                  const commandPlay = client.commands.get("play");
                  const song = ["dark", "academia"];
                  commandPlay
                    .execute(
                      client,
                      interaction,
                      "play",
                      song,
                      Discord,
                      interaction
                    )
                    .then(
                      function () {
                        commandPlay.execute(
                          client,
                          interaction,
                          "skip",
                          [],
                          Discord,
                          interaction
                        );
                      },
                      function () {
                        console.log("Error.");
                      }
                    );

                  //await interaction.deferReply();
                } catch (error) {
                  console.error(error);
                  await interaction.reply({
                    content: "There was an error while executing this command.",
                    ephemeral: true,
                  });
                }
              }
            }
            break;
          case "Hope you feel better :)":
            if (interaction.user.id === process.env.aysan) {
              //la vie en rose, blue moon, leaving on a jetplane more stuff
            } else {
              //my sad stuff lol, cag, piano music etc etc
            }
            //users
            break;
          case "Enjoy!":
            switch (interaction.user.id) {
              case process.env.aysan:
                //la vie en rose idk dude same stuff
                break;
              case process.env.sima:
                //rina sawayama, my stupid stuff
                break;
              case process.env.simaAlt:
                //same thing
                break;
              case process.env.ard:
                //ynw or that rapper idk, more rappers i guess slav music
                break;
              case process.env.mayer:
                //continuum, sob rock, bb king cos he has to, srv, prince, computer blue
                break;
              default:
                //my chill music hehe
                break;
            }
          default: //none left, just break.
            //users
            break;
        }
      }
    }
  }
  handleCommand();
};
