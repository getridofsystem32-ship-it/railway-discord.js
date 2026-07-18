const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ccu")
    .setDescription("Shows the current CCU for Lurking Giants"),

  async execute(interaction) {
    const universeId = 2339944792;

    await interaction.deferReply();

    try {
      // Game info
      const gameRes = await fetch(
        `https://games.roproxy.com/v1/games?universeIds=${universeId}`
      );
      const gameJson = await gameRes.json();
      const game = gameJson.data[0];

      // Game icon
      const iconRes = await fetch(
        `https://thumbnails.roproxy.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png&isCircular=false`
      );
      const iconJson = await iconRes.json();
      const icon = iconJson.data[0]?.imageUrl;

      // Game thumbnail
      const thumbRes = await fetch(
        `https://thumbnails.roproxy.com/v1/games/multiget/thumbnails?universeIds=${universeId}&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false`
      );
      const thumbJson = await thumbRes.json();
      const thumbnail =
        thumbJson.data[0]?.thumbnails?.[0]?.imageUrl;

      const embed = new EmbedBuilder()
        .setColor(0x00A2FF)
        .setTitle(game.name)
        .setURL(`https://www.roblox.com/games/${game.rootPlaceId}`)
        .setDescription("Current live player count")
        .addFields(
          {
            name: "CCU",
            value: game.playing.toLocaleString(),
            inline: true,
          },
          {
            name: "Favorites",
            value: game.favoritedCount.toLocaleString(),
            inline: true,
          },
          {
            name: "Visits",
            value: game.visits.toLocaleString(),
            inline: true,
          }
        )
        .setThumbnail(icon)
        .setImage(thumbnail)
        .setFooter({ text: "Roblox Game Stats" })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply("❌ Error fetching Roblox game data.");
    }
  },
};
