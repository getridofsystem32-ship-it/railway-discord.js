require("dotenv").config();

const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const path = require("path");

// Auto-load all commands from /commands
const commands = require("./commands.index");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const clientId = client.user.id;
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationCommands(clientId),
            {
                body: commands.map(cmd => cmd.data.toJSON())
            }
        );

        console.log("Slash commands registered.");
    } catch (error) {
        console.error(error);
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.find(cmd => cmd.data.name === interaction.commandName);
    if (!command) return;

    return command.execute(interaction);
});

if (!process.env.TOKEN) {
    console.error("Error: Discord bot token is not defined in environment variables.");
    process.exit(1);
}

client.login(process.env.TOKEN);
