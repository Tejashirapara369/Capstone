const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");

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
  const url = `${req.protocol}://${req.get("host")}/me`;
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

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1 check that in req header token exist
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    next(new AppError("You are not logged in , please login", 401, res));
  }
  //2 verify that token is correct
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3 check if User Exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    next(
      new AppError("the User beloging to this token No Longer Exist", 401, res)
    );
  }

  //4 check if token given before password is expire
  if (currentUser.isPasswordChanged(decoded.id)) {
    next(new AppError("Password is changed please Login Again", 401, res));
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return next(
        new AppError("You are not Authorized to perform this action", 403, res)
      );
    }
    next();
  };
};
