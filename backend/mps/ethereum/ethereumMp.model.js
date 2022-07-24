const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    walkerCommon: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    joggerCommon: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    runnerCommon: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    trainerCommon: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    walkerUncommon: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    joggerUncommon: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    runnerUncommon: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    trainerUncommon: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    walkerRare: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    joggerRare: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    runnerRare: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    trainerRare: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    walkerEpic: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    joggerEpic: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    runnerEpic: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    trainerEpic: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    efficiencyLvl1: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    efficiencyLvl2: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    efficiencyLvl3: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    efficiencyLvl4: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    efficiencyLvl5: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    efficiencyLvl6: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    efficiencyLvl7: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    efficiencyLvl8: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    efficiencyLvl9: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    luckLvl1: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    luckLvl2: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    luckLvl3: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    luckLvl4: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    luckLvl5: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    luckLvl6: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    luckLvl7: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    luckLvl8: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    luckLvl9: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    resilienceLvl1: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    resilienceLvl2: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    resilienceLvl3: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    resilienceLvl4: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    resilienceLvl5: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    resilienceLvl6: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    resilienceLvl7: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    resilienceLvl8: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    resilienceLvl9: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    comfortLvl1: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    comfortLvl2: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    comfortLvl3: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    comfortLvl4: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    comfortLvl5: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    comfortLvl6: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    comfortLvl7: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    comfortLvl8: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    comfortLvl9: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
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

  return sequelize.define("ethereummps", attributes, options);
}
