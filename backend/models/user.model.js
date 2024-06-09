const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide correct Email id"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  roles: {
    type: String,
    enum: ["admin", "user", "guide", "lead-guide"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minlength: [8, "length of a password must be greater than 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (v) {
        return v === this.password;
      },
      message: "Password is not same",
    },
  },
  passwordChanged: Date,
  passwordResetToken: String,
  passwordResetTokenExpire: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    next();
  }
  this.passwordChanged = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

userSchema.methods.isPasswordChanged = function (JWtTokenTime) {
  if (this.passwordChanged) {
    const passChangesTime = parseInt(this.passwordChanged.getTime() / 1000, 10);
    return JWtTokenTime < passChangesTime;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
