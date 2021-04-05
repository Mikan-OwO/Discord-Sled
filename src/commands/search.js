const { MessageEmbed, Collection } = require("discord.js");
const sleds = new Collection(require("../sleds"));

module.exports = {
  name: "search",
  fn: ({ message, args }) => {
    let res = [];
    args.forEach(a => {
      res = [...[...sleds.keys()].filter(s => s.includes(a)), res];
    });
    if(!res.length) return message.reply("該当するスレッドは見つかりませんでした。");
    message.reply(
      "検索結果はこちらです",
      new MessageEmbed()
      .setDescription(res.slice(0, 15).map((r,n) => `#${n+1} | ${r}`).join("\n"))         
    );
  }
}
  
