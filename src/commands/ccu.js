const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ccu")
    .setDescription("gives lurking giants ccu"),

   async execute(interaction) {
      const universeId = 6328880674;
  
      await interaction.deferReply(); // prevents interaction timeout
  
      try {
        const res = await fetch(
          `https://roproxy.com/games/v1/games?universeIds=${universeId}`
        );
  
        const json = await res.json();
  
        if (!json.data || json.data.length === 0) {
          return interaction.editReply("Invalid universe ID or no data found.");
        }
  
        const game = json.data[0];
        const ccu = game.playing;
  
        await interaction.editReply(
          `**${game.name}** currently has **${ccu}** players online.`
        );
      } catch (err) {
        console.error(err);
        await interaction.editReply("Error fetching CCU from Roblox API.");
      }
    }
};
