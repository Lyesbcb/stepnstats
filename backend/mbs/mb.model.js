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
    realm: { type: DataTypes.CHAR, allowNull: false },
    lvl: { type: DataTypes.INTEGER, allowNull: false },
    fileName: { type: DataTypes.CHAR, allowNull: false },
    content1: { type: DataTypes.CHAR, allowNull: false },
    content1Quantity: { type: DataTypes.FLOAT, allowNull: false },
    content2: { type: DataTypes.CHAR, allowNull: true },
    content2Quantity: { type: DataTypes.FLOAT, allowNull: true },
    content3: { type: DataTypes.CHAR, allowNull: true },
    content3Quantity: { type: DataTypes.FLOAT, allowNull: true },
    content4: { type: DataTypes.CHAR, allowNull: true },
    content4Quantity: { type: DataTypes.FLOAT, allowNull: true },
    content5: { type: DataTypes.CHAR, allowNull: true },
    content5Quantity: { type: DataTypes.FLOAT, allowNull: true },
    content6: { type: DataTypes.CHAR, allowNull: true },
    content6Quantity: { type: DataTypes.FLOAT, allowNull: true },
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

  return sequelize.define("mbs", attributes, options);
}
