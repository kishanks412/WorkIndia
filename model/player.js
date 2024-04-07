const { DataTypes } = require("sequelize");
// const teamModel = require('./model').teamModel;

module.exports = (db_config) => {
  const Player = db_config.define("player", {
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matches_played: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    runs: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    strike_rate: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    average: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Player;
};