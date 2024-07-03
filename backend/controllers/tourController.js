const factory = require("./handlerFactory");
const Tour = require("../models/tour.model");

exports.getAllTours = factory.getAll(Tour);

exports.getTour = async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "rating review user",
  });
  if (!tour) {
    next(new AppError("Cannot Find This Tour", 400, res));
  }
  res.status(200).json({
    message: "success",
    tour,
  });
};
