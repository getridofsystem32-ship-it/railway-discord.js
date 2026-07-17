const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ccu")
    .setDescription("gives lurking giants ccu"),

  async execute(interaction) {
    const universeId = 6328880674; // Lurking Giants universe ID

    await interaction.deferReply();

    try {
      const res = await fetch(
        `https://roproxy.com/games/v1/games?universeIds=${universeId}`
      );

      const json = await res.json();

      if (!json.data || json.data.length === 0) {
        return interaction.editReply("Invalid universe ID or no data found.");
      }

      const game = json.data[0];
      const title = game.name || "Unknown Experience";
      const ccu = game.playing ?? 0;

      await interaction.editReply(
        `**${title}** currently has **${ccu}** players online.`
      );
    } catch (err) {
      console.error(err);
      await interaction.editReply("Error fetching CCU from RoProxy.");
    }
  }
};
