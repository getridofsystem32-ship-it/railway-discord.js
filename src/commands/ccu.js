const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ccu")
    .setDescription("gives lurking giants ccu"),

  async execute(interaction) {
    const universeId = 2339944792; // Lurking Giants universe ID

    await interaction.deferReply();

    try {
      const res = await fetch(
        `https://games.roproxy.com/v1/games?universeIds=${universeId}`
      );

      const json = await res.json();

      const game = json.data[0];
      const ccu = game.playing;
      const title = game.name;

      await interaction.editReply(
        `**${title}** currently has **${ccu}** players online.`
      );
    } catch (err) {
      console.error(err);
      await interaction.editReply("Error fetching CCU.");
    }
  }
};
