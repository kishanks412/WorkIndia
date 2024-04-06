const model = require("../model/model");

const connectDB = () => {
  model.db_config
    .sync({})
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log("unsuccesful", error);
    });
};

module.exports = connectDB;
