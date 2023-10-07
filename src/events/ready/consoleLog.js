require("colors");

module.exports = (client) => {
  console.log(`[INFO] ${client.user.username} está online!`.cyan);
};