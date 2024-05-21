const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection Successful!");
  });

  
app.listen(port, function () {
  console.log(`server is running on port ${port}`);
});
