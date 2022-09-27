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
    content: { type: DataTypes.CHAR, allowNull: false },
    contentPrice: { type: DataTypes.FLOAT, allowNull: false },
    type: { type: DataTypes.CHAR, allowNull: false }, // above, bellow, etc.
    currency: { type: DataTypes.CHAR, allowNull: false }, // crypto, dollars
    realm: { type: DataTypes.CHAR, allowNull: false }, // Solana, Bnb, Ethereum
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

  return sequelize.define("notifications", attributes, options);
}
