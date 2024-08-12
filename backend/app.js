const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRouter = require("./routes/userRoutes");
const tourRouter = require("./routes/tourRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const corsOptions = {
  origin: "http://localhost:4200", // Whitelist your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // List allowed methods
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

dotenv.config({ path: "./config.env" });

app.use("/assets", express.static("assets"));

app.use("/api/user", userRouter);
app.use("/api/tour", tourRouter);
app.use("/api/review", reviewRouter);
app.use("/api/booking", bookingRouter);

const port = process.env.PORT || 5000;
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log("DB connection Successful!");
});

app.listen(port, function () {
  console.log(`server is running on port ${port}`);
});
