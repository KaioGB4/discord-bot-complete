module.exports = async (client, guildId) => {
  let applicationCammands;

  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    applicationCammands = guild.commands;
  } else {
    applicationCammands = client.application.commands;
  }

  await applicationCammands.fetch();
  return applicationCammands;
};
