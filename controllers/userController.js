const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");
const Cart = require("../models/Cart");
const sendToken = require("../utils/JWTToken");
const crypto = require("crypto");
require("dotenv").config();
const sendEmail = require("../utils/sendEmail");
//Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name: name,
    email: email,
    password: password,
    role: "user",
  });
  // const token = user.getJWTToken();
  // await user.save();
  const cart = await Cart.create({
    userId: user._id,
  });
  // res.status(201).json({
  //     success:true,
  //     user,
  //     token
  // })
  sendToken(user, 201, res);
});

exports.loginuser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given passsword and user both
  console.log(email, password);
  if (!email || !password) {
    return next(new ErrorHandler("Please provide an Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    return next(new ErrorHandler("User Invalid email or password", 401));
  }

  const isPasswordMatched = await bcryptjs.compare(password, user.password);
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }
  // req.user = user
  sendToken(user, 200, res);
});

//Logout User

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  //Get Reset Password
  const resetPassword = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetPassword}`;

  const message = `Your password reset token is:- \n\n ${resetPasswordUrl}\n\n If you have not requested this email please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordexpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPasswordNow = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordexpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  console.log("Hello");
  // console.log();
  const { currPassword, newPassword, confirmNewPassword } = req.body;
  console.log(req.user);
  console.log(req.user._id);
  const updatePassUser = await User.findOne({ _id: req.user._id }).select(
    "+password"
  );
  console.log(updatePassUser);
  const isPasswordtrue = await bcryptjs.compare(
    currPassword,
    updatePassUser.password
  );
  console.log("hello", isPasswordtrue);

  if (isPasswordtrue === true) {
    console.log("true");
    if (newPassword === confirmNewPassword) {
      const newHashedPass = await bcryptjs.hash(newPassword, 10);
      const us = await User.updateOne(
        { _id: req.user._id },
        { $set: { password: newHashedPass } }
      );
      res.status(200).json({
        success: true,
        message: "Updated password",
      });
    } else {
      return next(new ErrorHandler("password dont match", 500));
    }
  } else {
    return next(new ErrorHandler("Wrong Password", 500));
  }
  
  // console.log(updatePassUser);
});
