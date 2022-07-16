const config = require("config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  // init models and add them to the exported db object
  db.User = require("../users/user.model")(sequelize);
  db.Run = require("../runs/run.model")(sequelize);
  db.Mb = require("../mbs/mb.model")(sequelize);
  db.Nft = require("../nfts/nft.model")(sequelize);
  db.SolanaMp = require("../mps/solana/solanaMp.model")(sequelize);
  db.BNBMp = require("../mps/bnb/bnbMp.model")(sequelize);
  db.EthereumMp = require("../mps/ethereum/ethereumMp.model")(sequelize);

  // sync all models with database
  await sequelize.sync();
}
