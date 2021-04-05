const { Client, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client();

const { prefix, token } = require("./config");

client.on("ready", () => {
  client.commands = new Collection();
  
  fs.readdirSync("./commands").map(file => {
    const { name, fn } = require(`./commands/${file}`);
    commands.set(name, fn);
  });
});

client.on("message", async (message) => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const [cmd, ...args] = message.content.slice(prefix.length).split(" ");
  if(!client.commands.has(cmd)) return;
  const handler = await client.commands.get(cmd);
  handler({ message, args });
});

client.login(token);
