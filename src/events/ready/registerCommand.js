require("colors");

const { testServerId } = require("../../config.json");
const commandComparing = require("../../utils/commandComparing");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    const [localCommands, applicationCommands] = await Promise.all([
      getLocalCommands(),
      getApplicationCommands(client, testServerId),
    ]);

    for (const localCommand of localCommands) {
      const { data, deleted } = localCommand;
      const {
        name: commandName,
        description: commandDescription,
        options: commandOptions,
      } = data;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === commandName
      );

      if (deleted) {
        if (existingCommand) {
          await applicationCommands.delete(existingCommand.id);
          console.log(
            `[Registro de comando] O comando ${commandName} foi deletado.`
              .red
          );
        } else {
          console.log(
            `[Registro de comando] O comando ${commandName} foi pulado, e a propriedade "deleted" foi colocado como "true".`
              .grey
          );
        }
      } else if (existingCommand) {
        if (commandComparing(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            name: commandName,
            description: commandDescription,
            options: commandOptions,
          });
          console.log(
            `[Registro de comando] O comando ${commandName} foi editado.`
              .yellow
          );
        }
      } else {
        await applicationCommands.create({
          name: commandName,
          description: commandDescription,
          options: commandOptions,
        });
        console.log(
          `[Registro de comando] O comando ${commandName} foi registrado.`
            .green
        );
      }
    }
  } catch (error) {
    console.log(
      `[ERROR] Um erro ocorreu nos registros do comandos:\n ${error}`.red
    );
  }
};
