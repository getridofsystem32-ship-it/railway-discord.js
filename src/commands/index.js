const fs = require("fs");
const path = require("path");

const commandsPath = __dirname;

// Load every .js file EXCEPT index.js
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(".js") && file !== "index.js");

const commands = [];

for (const file of commandFiles) {
  const command = require(`./${file}`);

  // Validate command structure
  if (command.data && command.execute) {
    commands.push(command);
  } else {
    console.warn(`⚠️ Command file ${file} is missing data or execute`);
  }
}

module.exports = commands;
