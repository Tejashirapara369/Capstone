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

exports.forgetPassword= catchAsync(async(req,res,next)=>{
  //check if user exist 
  const user=await User.findOne({email:req.body.email});
  const resetPassword = Math.random().toString(36).slice(2) +Math.random().toString(36).toUpperCase().slice(2);
  const resetLink = null;
  if(!user){
      next(new AppError('There is no User With this email address',404,res));
  }
  try{

      user.password = resetPassword;
      user.passwordConfirm  = resetPassword;
      await new Email(user,resetLink).sendResetPassword()
      await user.save();
      res.status(200).json({
          status:'success',
          message:'mail send Successfully'
  })
  }catch(err){
  }
})

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

exports.isLoggedIn = async (req, res, next) => {
  let token;
  //1 check that in req header token exist
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
  }
  if (token) {
      try {
          // 1) verify token
          const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
          
          // 2) Check if user still exists
          const currentUser = await User.findById(decoded.id);
          if (!currentUser) {
              return next();
          }

          // 3) Check if user changed password after the token was issued
          if (currentUser.isPasswordChanged(decoded.id)) {
              return next();
          }

          // THERE IS A LOGGED IN USER
          res.locals.user = currentUser;

          // console.log('res.locals.user', res.locals.user)
          
          return next();
      } catch (err) {
          console.log('err id', err);
          return next();
      }
  }
  next();
};
