const sleds = [...new Map(require("../sleds")).keys()];

module.exports = {
  name: "top",
  fn: ({ message, args, client }) => {
    const res = sleds.map(s => {
      return {
        name: s,
        length: client.channels.cache.find(c => c.name === s).messages.cache.size
      }
    });
    const top = res.sort((a,b) => b.size - a.size).slice(0, 10);
    message.channel.send(
      new MessageEmbed()
      .setTitle("Top 10")
      .setDescription(`Rank  |  Name  |  Messages\n${top.map((t,n) => `#${n} | ${t.name} | ${t.size}`).join("\n")}`)
    );
  }
}
