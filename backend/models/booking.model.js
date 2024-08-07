const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    required: [true, "A booking must belong to a tour"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A booking must belong to a user"],
  },
  price: {
    type: Number,
    required: [true, "Price of a tour must be required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user");
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
