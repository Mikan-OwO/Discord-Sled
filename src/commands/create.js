const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const { prefix }  = require("../config");
const sleds = new Map(require("../sleds"));

module.exports = {
  name: "create",
  fn: ({ message, args }) => {
    const name = args.join(" ");
    if(!sleds.has(name)) return message.reply(`${name}というスレッドは既に存在しています。`);
    sleds.set(name, { user: message.author.id, date: Date.now() });
    message.author.send(
      new MessageEmbed()
      .setTitle("成功")
      .setDescription(`スレッドを作成しました。\n削除したい場合は作成したチャンネルで\`${prefix}delete\`と発言してください。`)
    );
  }
}
