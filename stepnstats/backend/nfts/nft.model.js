const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    lvl: { type: DataTypes.INTEGER, allowNull: false },
    realm: { type: DataTypes.CHAR, allowNull: false },
    fileName: { type: DataTypes.CHAR, allowNull: false },
    type: { type: DataTypes.CHAR, allowNull: false },
    quality: { type: DataTypes.CHAR, allowNull: false },
    efficiency: { type: DataTypes.FLOAT, allowNull: true },
    luck: { type: DataTypes.FLOAT, allowNull: true },
    comfort: { type: DataTypes.FLOAT, allowNull: true },
    resilience: { type: DataTypes.FLOAT, allowNull: true },
    mint: { type: DataTypes.INTEGER, allowNull: true },
    nftId: { type: DataTypes.INTEGER, allowNull: false },
    socket1: { type: DataTypes.CHAR, allowNull: true },
    socket2: { type: DataTypes.CHAR, allowNull: true },
    socket3: { type: DataTypes.CHAR, allowNull: true },
    socket4: { type: DataTypes.CHAR, allowNull: true },
    base: { type: DataTypes.BOOLEAN, allowNull: false },
  };

  const options = {
    defaultScope: {
      // exclude hash by default
      attributes: { exclude: [] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("nfts", attributes, options);
}
