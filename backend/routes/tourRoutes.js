const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");
const review = require('../models/review.model');

router.route("/").get(tourController.getAllTours);

router
  .route("/top-tour")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/:slug").get(tourController.getTour);

module.exports = router;
