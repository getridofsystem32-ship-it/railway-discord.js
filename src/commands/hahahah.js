const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("haha")
    .setDescription("evil ai laughs"),

  async execute(interaction) {
    await interaction.reply("im fricking evil claude ahahhahah");
  }
};
