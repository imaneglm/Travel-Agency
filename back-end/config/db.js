const oracledb = require("oracledb");

function makeConfig(host) {
  return {
    user: "system",
    password: process.env.DB_PASSWORD,
    connectString: `${host}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  };
}

async function getNorthConnection() {
  return await oracledb.getConnection(makeConfig(process.env.NORTH_HOST));
}

async function getEastConnection() {
  return await oracledb.getConnection(makeConfig(process.env.EAST_HOST));
}

module.exports = { getNorthConnection, getEastConnection };