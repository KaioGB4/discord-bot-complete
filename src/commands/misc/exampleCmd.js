const {SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Testa se tudo funciona")
        .setDMPermission(false)
        .addSubcommandGroup((subcommandgroup) => 
            subcommandgroup
            .setName("user")
            .setDescription("Configura um usuário")
            .addSubcommand((subcommand) => 
                subcommand
                .setName("role")
                .setDescription("Configura o cargo de um usuário")
                .addUserOption((option) =>
                    option.setName("user")
                    .setDescription("O usuário para configurar")
                ) 
            )
            .addSubcommand((subcommand) => 
                subcommand
                .setName("nickname")
                .setDescription("Configura o nome de um usuário")
                .addStringOption((option) =>
                    option.setName("nickname")
                    .setDescription("O o nome que o usuário vai receber")
                ) 
                .addUserOption((option) =>
                    option.setName("user")
                    .setDescription("O usuário para configurar")
                ) 
            )
        )
        .addSubcommand((subcommand) => 
            subcommand
            .setName("message")
            .setDescription("Configura uma mensagem")
        )
        .toJSON(),
        userPermissions: [PermissionFlagsBits.ManageMessages],
        botPermissions: [PermissionFlagsBits.Connect],

        run: (client, interaction) => {
            return interaction.reply("Isso é um comando de testes")
        }
}