const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Testa se tudo funciona.")
    .setDMPermission(false)
    .addSubcommandGroup((subcommandgroup) =>
      subcommandgroup
        .setName("user")
        .setDescription("Configura um usuário.")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("role")
            .setDescription("Configura o cargo de um usuário.")
            .addUserOption((option) =>
              option.setName("user").setDescription("Usuário para configurar.")
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("nickname")
            .setDescription("Configura um apelido para ao usuário.")
            .addStringOption((option) =>
              option
                .setName("nickname")
                .setDescription("O apelido que o usuário deve ter.")
            )
            .addUserOption((option) =>
              option.setName("user").setDescription("O usuário para configurar")
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("message").setDescription("Configura a mensagem")
    )
    .toJSON(),
  userPermissions: [PermissionFlagsBits.ManageMessage],
  botPermissions: [PermissionFlagsBits.Connect],

  run: (client, interaction) => {
    return interaction.reply("Que belo pênis");
  },
};
