const express = require("express");
require("dotenv").config();
const user = require("./routes/user");

const app = express();
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// connecting to DB
const connectedDB = require("./config/database");
connectedDB();

app.use("/api", user);


const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});
