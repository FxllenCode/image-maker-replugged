const { Plugin } = require('powercord/entities');
const http = require('powercord/http');
const Settings = require('./Components/Settings');

module.exports = class NoBitches extends Plugin {
  async startPlugin() {
    powercord.api.commands.registerCommand({
      command: 'no_bitches',
      description: 'Makes a no-bitches image with the following text',
      usage: '{c} <text>',
      executor: (args) => {
        let str = args.join(' ')
        if (this.settings.get("caps", false)) {
          str = str.toUpperCase()
        }
        return {
          send: true,
          result: `https://api.no-bitch.es/${encodeURIComponent(str)}`,
        }
      },
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

    const { get, set } = this.settings;
    if (get('caps') === undefined) set('caps', false);

    powercord.api.settings.registerSettings(this.entityID, {
			category: this.entityID,
			label: 'Image Maker',
			render: Settings,
		});
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand('no_bitches');
    powercord.api.commands.unregisterCommand('blahaj');
    powercord.api.settings.unregisterSettings(this.entityID)
  }

  async findBlahaj() {
    const response = await http.get('https://blahaj.shop/api/random/text');
    const text = response.body.toString();
    return text;
  }
};
