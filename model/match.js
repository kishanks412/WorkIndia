const { Sequelize, DataTypes } = require("sequelize");

module.exports = (db_config) => {
  const match = db_config.define("match", {
    match_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    team1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  return match;
};