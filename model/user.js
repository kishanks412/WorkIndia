const { Sequelize, DataTypes } = require("sequelize");

module.exports = (db_config) => {
  const user = db_config.define("user", {
    user_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return user;
};
