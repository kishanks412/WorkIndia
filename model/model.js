const sequelize = require('sequelize')
const userModel = require('./user')
const teamModel = require('./team')
const matchModel = require('./match')
const playerModel = require('./player')
require("dotenv").config();


exports.db_config = new sequelize(
    process.env.DB_NAME,
    'root',
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases:0,
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000,
        },
        timezone:'+05:30',
        logging:false,
    }
);

exports.userModel = userModel(exports.db_config);
exports.teamModel = teamModel(exports.db_config);
exports.matchModel = matchModel(exports.db_config);
exports.playerModel = playerModel(exports.db_config);