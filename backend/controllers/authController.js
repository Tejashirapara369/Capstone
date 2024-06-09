const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const catchAsync = require("../utils/catchAsync");

const createAndSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = false;
  }
  res.cookie("jwt", token, options);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

exports.signup = catchAsync(async (req, res) => {
  let newUser;
  try {
    newUser = await User.create(req.body);
  } catch (err) {
    throw new AppError(err.message, 400, res);
  }
  const url = `${req.protocol}://${req.get("host")}/me  `;
  await new Email(newUser, url).sendWelcome();
  createAndSendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please Provide email and password", 400, res));
  }
  const user = await User.findOne({ email })
    .select("+password")
    .select("+active");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new AppError("Please enter correct email & password", 401, res)
    );
  }
  createAndSendToken(user, 200, res);
});
