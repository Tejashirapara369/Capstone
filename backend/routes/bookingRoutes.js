const express = require("express");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController.js");
const router = express.Router();


router.use(authController.protect);
router.get("/checkout/:tourId", bookingController.getSession);

module.exports = router;
