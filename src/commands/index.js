const fs = require("fs");
const path = require("path");

const commandsPath = __dirname;
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js") && file !== "index.js");

const commands = [];

for (const file of commandFiles) {
    const command = require(`./${file}`);
    commands.push(command);
}

module.exports = commands;
