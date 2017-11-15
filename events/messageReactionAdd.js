module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async execute(r, user) {
    const message = r.message;
    const attachment = message.attachments.first() ? { files: [{ attachment: message.attachments.first().url, name: message.attachments.first().filename }] } : null;
    const validEmojis = ['📌', '📍'];
    if (validEmojis.includes(r.emoji.name)) {
      try {
        const author = user;
        const member = message.guild.member(author);
        const msg = { author:author, member:member, guild: message.guild, client: this.client, channel: message.channel };
        if (this.client.permlevel(msg) > 2)
          await message.pin();
        else
          await user.send(`Here is the message you pinned:\n${message.cleanContent}`, attachment);
      } catch (error) {
        if (error.message === 'Cannot send messages to this user') {
          await message.channel.send(`I cannot send you that message ${user}, as it appears you have **Direct Messages's** disabled.`);
        } else {
          throw error;
        }
      }
    }
  }
};