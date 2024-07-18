const catchAsync = require("./../utils/catchAsync");
const mongoose = require("mongoose");
const stripe = require("stripe")(
  `sk_test_51HqUpuFB9dJUDyrAtxx3q1dagWx1Id0b5N5emJDQDUPHyTRelnWevTfLx5GJTcLJyXjsdUQh2Vl9kkzNVLYCn3sU008BJ1dTZP`
);
const Tour = require("../models/tour.model");

exports.getSession = catchAsync(async (req, res, next) => {
  const slug = req.params.tourId;

  const tour = await Tour.findOne({ slug });

  if (tour) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://localhost:4200/MyBookings?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
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
              images: [`https://www.natours.dev/img/tours/tour-2-1.jpg`],
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
