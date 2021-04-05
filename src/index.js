const { Client, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client();

const sleds = new Collection(require("./sleds"));
const { prefix, token } = require("./config");

client.on("ready", () => {
  client.commands = new Collection();
  
  fs.readdirSync("./commands").map(file => {
    const { name, fn } = require(`./commands/${file}`);
    commands.set(name, fn);
  });
});

client.on("message", async (message) => {
  if(message.content.startsWith(prefix)) {
    const [cmd, ...args] = message.content.slice(prefix.length).split(" ");
    if(!client.commands.has(cmd)) return;
    const handler = await client.commands.get(cmd);
    await handler({ message, args, client });
  } else {
    if(!sleds.has(message.channel.name)) return;
    client.channels.cache.filter(ch => ch.name === message.channel.name)
    .forEach(ch => {
      ch.send(
        new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(message.content)
        .setFooter(message.guild.name, message.guild.iconURL())
      );
    });
    message.react(":outbox_tray:")
    .then(() => {
      setTimeout(() => (message.reactions.cache.get(":outbox_tray:").users.remove()), 2000);
    });
});

client.login(token);
