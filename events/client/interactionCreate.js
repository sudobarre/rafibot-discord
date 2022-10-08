
module.exports = (client, Discord, interaction) => {

  async function handleCommand() {
    if (interaction.isCommand()) {
      const slashcmd = client.slashcommands.get(interaction.commandName);
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
    } 
    }
  handleCommand();
  return;
};
