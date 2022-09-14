const { Plugin } = require('powercord/entities');
const http = require('powercord/http');

module.exports = class NoBitches extends Plugin {
  async startPlugin() {
    powercord.api.commands.registerCommand({
      command: 'no_bitches',
      description: 'Makes a no-bitches image with the following text',
      usage: '{c} <text>',
      executor: (args) => ({
        send: true,
        result: `https://api.no-bitch.es/${encodeURIComponent(args.join(' '))}`,
      }),
    });
    powercord.api.commands.registerCommand({
      command: 'blahaj',
      description: 'Finds a blahaj image for you',
      usage: '{c}',
      executor: async () => ({
        send: true,
        result: await this.findBlahaj(),
      }),

    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand('no_bitches');
    powercord.api.commands.unregisterCommand('blahaj');
  }

  async findBlahaj() {
    const response = await http.get('https://blahaj.shop/api/random/text');
    const text = response.body.toString();
    return text;
  }
};
