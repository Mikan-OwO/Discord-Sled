const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { prefix }  = require("../config");
const sleds = new Map(require("../sleds"));

module.exports = {
  name: "create",
  fn: ({ message, args }) => {
    const name = args.join("-");
    if(!sleds.has(name)) return message.reply(`${name}というスレッドは既に存在しています。`);
    sleds.set(name, { user: message.author.id, date: Date.now() });
    message.author.send(
      new MessageEmbed()
      .setTitle("成功")
      .setDescription(`スレッドを作成しました。\n削除したい場合は作成したチャンネルで\`${prefix}delete\`と発言してください。`)
    );
    fs.writeFile(path.join(__dirname, "../sleds.json"), JSON.stringify([...sleds]), (e) => {
      if(e) console.error(e);
    });
  }
}
