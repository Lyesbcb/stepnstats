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
    type: { type: DataTypes.CHAR, allowNull: false },
    quality: { type: DataTypes.CHAR, allowNull: false },
    mint: { type: DataTypes.INTEGER, allowNull: true },
    nftId: { type: DataTypes.INTEGER, allowNull: false },
    socket1: { type: DataTypes.CHAR, allowNull: true },
    socket2: { type: DataTypes.CHAR, allowNull: true },
    socket3: { type: DataTypes.CHAR, allowNull: true },
    socket4: { type: DataTypes.CHAR, allowNull: true },
    // Base
    fileNameBase: { type: DataTypes.CHAR, allowNull: true },
    efficiencyBase: { type: DataTypes.FLOAT, allowNull: true },
    luckBase: { type: DataTypes.FLOAT, allowNull: true },
    comfortBase: { type: DataTypes.FLOAT, allowNull: true },
    resilienceBase: { type: DataTypes.FLOAT, allowNull: true },
    // Optimized
    lvlOptimized: { type: DataTypes.INTEGER, allowNull: true },
    efficiencyOptimized: { type: DataTypes.FLOAT, allowNull: true },
    luckOptimized: { type: DataTypes.FLOAT, allowNull: true },
    comfortOptimized: { type: DataTypes.FLOAT, allowNull: true },
    resilienceOptimized: { type: DataTypes.FLOAT, allowNull: true },
    gem1Optimized: { type: DataTypes.CHAR, allowNull: true },
    gem2Optimized: { type: DataTypes.CHAR, allowNull: true },
    gem3Optimized: { type: DataTypes.CHAR, allowNull: true },
    gem4Optimized: { type: DataTypes.CHAR, allowNull: true },
    // Increased
    fileNameIncreased: { type: DataTypes.CHAR, allowNull: true },
    efficiencyIncreased: { type: DataTypes.FLOAT, allowNull: true },
    luckIncreased: { type: DataTypes.FLOAT, allowNull: true },
    comfortIncreased: { type: DataTypes.FLOAT, allowNull: true },
    resilienceIncreased: { type: DataTypes.FLOAT, allowNull: true },
    gem1Increased: { type: DataTypes.CHAR, allowNull: true },
    gem2Increased: { type: DataTypes.CHAR, allowNull: true },
    gem3Increased: { type: DataTypes.CHAR, allowNull: true },
    gem4Increased: { type: DataTypes.CHAR, allowNull: true },
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
