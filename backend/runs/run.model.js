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
    date: { type: DataTypes.DATE, allowNull: false },
    duration: { type: DataTypes.TIME, allowNull: false },
    energy: { type: DataTypes.FLOAT, allowNull: false },
    type: { type: DataTypes.CHAR, allowNull: false },
    lvl: { type: DataTypes.INTEGER, allowNull: false },
    km: { type: DataTypes.FLOAT, allowNull: false },
    steps: { type: DataTypes.INTEGER, allowNull: false },
    fileName: { type: DataTypes.CHAR, allowNull: false },
    gst: { type: DataTypes.FLOAT, allowNull: false },
    nftId: { type: DataTypes.INTEGER, allowNull: false },
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

  return sequelize.define("Run", attributes, options);
}
