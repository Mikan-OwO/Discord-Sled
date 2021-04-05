const { MessageEmbed } = require("discord.js");
const sleds = new Map(require("../sleds"));

module.exports = {
  name: "delete",
  fn: ({ message, args, client }) => {
    if(!sleds.has(message.channel.name)) return;
    if(sleds.get(message.channel.name).user !== message.author.id) return;
    sleds.delete(message.channel.name);
    client.channels.cache.filter(ch => ch.name === message.channel.name)
    .forEach(ch => {
      ch.send(
        new MessageEmbed()
        .setTitle("お知らせ")
        .setDescription("このスレッドは作成者により削除されました。\nこのチャンネルを削除しますか？")
      ).then(async embed => {
        await embed.react("⭕");
        embed.awaitReactions((r => r.name === "⭕"), { max: 1, time: 10000, errors: ["time"] })
        .then(() => ch.delete())
        .catch(() => ch.send("タイムアウト"));
      });
    });
  }
}
