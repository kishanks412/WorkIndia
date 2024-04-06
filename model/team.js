const { Sequelize, DataTypes } = require("sequelize");

module.exports = (db_config) => {
  const team = db_config.define("team", {
    team_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    team_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return team;
};
