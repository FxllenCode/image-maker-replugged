const { Plugin } = require('powercord/entities');

module.exports = class NoBitches extends Plugin {
    startPlugin () {
        powercord.api.commands.registerCommand({
            command: "no_bitches",
            description: "Makes a no-bitches image with the following text"
        })
    }
}