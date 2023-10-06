const {EmbedBuilder} = require('discord.js');
const {developersId, testServerUd} = require("../../config.json");
const mConfig = require('../../messageConfig.json');
const getLocalCommand = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
    if (!interaction.IsChatInputCommand) return;

    const localCommands = getLocalCommands();
    const commandObject = localCommands.find((cmd) => cmd.data.name === interaction.commandName);

    if (!commandObject) return;

    const createEmbed = (color, description) => new EmbedBuilder().setColor(color).setDescription(description);

    if (commandObject.devOnly && !developersId.includes(interaction.member.id)) {
        const rEmbed = createEmbed(mConfig.embedColorError, mConfig.commandDevOnly);
        return interaction.reply({ embeds: [rEmbed], ephemeral: true});
    }

    if (commandObject.testMode && interaction.guild.id !== testServerUd) {
        const rEmbed = createEmbed(mConfig.embedColorError, mConfig.commandTestMode);
        return interaction.reply({ embeds: [rEmbed], ephemeral: true});
    }

    for (const permission of commandObject.userPermissions || []) {
        if (!interaction.member.permission.has(permissions)) {
            const rEmbed = createEmbed(
                mConfig.embedColorError,
                mConfig.userNoPermissions
            );
            return interaction.reply({ embeds: [rEmbed], ephemeral: true});
        }
    }

const bot = interaction.guild.members.me;
for (const permissions of commandObject.botPermissions || []) {
    if (!bot.member.permission.has(permissions)) {
        const rEmbed = createEmbed(
            mConfig.embedColorError,
            mConfig.botNoPermissions
        );
        return interaction.reply({ embeds: [rEmbed], ephemeral: true});
    }
    try {
        await commandObject.run(client, interaction);
    } catch (error) {
        console.log(
            `[ERROR] Um erro ocorreu na validação do comando:\n ${error}`.red
        );
    }
}
};