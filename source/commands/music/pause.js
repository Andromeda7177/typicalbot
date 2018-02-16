const Command = require("../../structures/Command");
const Constants = require(`../../utility/Constants`);

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Pause the song currently streaming.",
            usage: "pause",
            mode: Constants.Modes.LITE
        });
    }

    execute(message, parameters, permissionLevel) {
        if (!this.client.utility.music.hasPermissions(message, this)) return;

        const connection = message.guild.voiceConnection;
        if (!connection) return message.send(`Nothing is currently streaming.`);
        if (!connection.guildStream) {
            connection.disconnect();
            return message.error("An error occured while trying to complete this action, and requires me to leave the voice channel. Sorry!");
        }

        if (!message.member.voiceChannel || message.member.voiceChannel.id !== connection.channel.id) return message.error("You must be in the same voice channel to preform that command.");

        if (connection.guildStream.mode !== "queue") return message.error("This command only works while in queue mode.");

        connection.guildStream.pause();

        message.reply(`Streaming is now paused.`);
    }
};