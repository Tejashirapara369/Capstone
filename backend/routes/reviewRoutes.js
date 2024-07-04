const express = require("express");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");
const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route("/:tourId")
  .post(
    authController.restrict("user"),
    reviewController.setTourAndUserId,
    reviewController.createReview
  );
router.route("/").get(reviewController.getAllReviews);
router
  .route("/:id")
  .delete(
    authController.restrict("admin", "user"),
    reviewController.deleteReview
  )
  .patch(
    authController.restrict("admin", "user"),
    reviewController.updateReview
  )
  .get(reviewController.getOneReview);

module.exports = router;
