const express = require("express");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController.js");
const router = express.Router();

router.use(authController.isLoggedIn)
router.use(authController.protect);
router.get("/checkout/:tourId", bookingController.getSession);

router
  .get("/", bookingController.getAllBooking)
  .post("/", bookingController.createBooking);

router.get("/my-bookings", authController.protect, bookingController.getMyTours);

router
  .route("/:id")
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
