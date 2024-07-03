const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config({ path: "./config.env" });

app.use("/api/user", userRouter);
app.use('/api/tour', tourRouter);

const port = process.env.PORT || 5000;
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection Successful!");
  });

app.listen(port, function () {
  console.log(`server is running on port ${port}`);
});
