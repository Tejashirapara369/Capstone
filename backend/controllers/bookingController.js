const catchAsync = require("./../utils/catchAsync");
const stripe = require("stripe")(
  `sk_test_51HqUpuFB9dJUDyrAtxx3q1dagWx1Id0b5N5emJDQDUPHyTRelnWevTfLx5GJTcLJyXjsdUQh2Vl9kkzNVLYCn3sU008BJ1dTZP`
);
const Tour = require("../models/tour.model");
const Booking = require("../models/booking.model");
const factory = require("./handlerFactory");

exports.getSession = catchAsync(async (req, res, next) => {
  const slug = req.params.tourId;

  const tour = await Tour.findOne({ slug });

  if (tour) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://localhost:4200/booking`,
      cancel_url: `http://localhost:4200/tours/${tour.slug}`,
      customer_email: req.user.email,
      client_reference_id: req.params.tourId,
      line_items: [
        {
          price_data: {
            unit_amount: tour.price * 100,
            currency: "cad",
            product_data: {
              name: `${tour.name} Tour`,
              description: tour.summary,
              images: tour.images,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    });

    res.status(200).json({
      status: "success",
      session,
    });
  } else {
    res.status(404).send("Tour not found");
  }
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  const Bookedtour = await Booking.find({ user: req.user.id });
  const tourIds = Bookedtour.map(el => el.tour.toString());
  const tours = await Tour.find({ id: { $in: tourIds } });

  res.status(200).json({ tours });
});

exports.getAllBooking = factory.getAll(Booking);
exports.createBooking = factory.createOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
exports.getBooking = catchAsync(async (req, res, next) => {
  const AllUser = await Booking.find({ tour: req.params.id });
  console.log(AllUser);
  res.status(200).json({
    status: "success",
    user: AllUser,
  });
});
