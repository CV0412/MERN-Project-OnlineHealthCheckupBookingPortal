const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");

function validateGmail(email) {
  // Regular expression pattern to match Gmail address
  var gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  // Test if the email matches the Gmail pattern
  if (gmailRegex.test(email)) {
    return true; // Valid Gmail address
  }

  return false; // Invalid Gmail address
}

function validatePassword(password) {
  // Regular expression patterns for different password requirements
  var uppercaseRegex = /[A-Z]/;
  var lowercaseRegex = /[a-z]/;
  var numberRegex = /[0-9]/;
  var symbolRegex = /[!@#$%^&*()]/;

  // Check if the password meets the length requirement
  if (password.length < 8 || password.length > 15) {
    return false; // Invalid password length
  }
  // Test if the password meets all the requirements
  if (
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    numberRegex.test(password) &&
    symbolRegex.test(password)
  ) {
    return true; // Valid password
  }

  return false; // Invalid password
}

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }

    if (req.body.number.length !== 10) {
      return res
        .status(200)
        .send({ message: "Enter 10 Digits Number only", success: false });
    }

    if (validateGmail(req.body.email) == false) {
      return res
        .status(200)
        .send({ message: "Enter Correct Gmail", success: false });
    }

    if (validatePassword(req.body.password) == false) {
      return res
        .status(200)
        .send({ message: "Enter an valid password", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    if (!user.status) {
      return res
        .status(200)
        .send({ message: "User has been Blocked", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const forgetpasswordController = async (req, res) => {
  try {
    const { email, number, newpassword } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    } else if (!newpassword) {
      return res.status(400).send({ message: "New Password is required" });
    } else if (!number) {
      return res.status(400).send({ message: "Number is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }

    if (number !== user.number) {
      return res
        .status(200)
        .send({ message: "Incorrect Number", success: false });
    }

    if (validatePassword(newpassword) == false) {
      return res
        .status(200)
        .send({ message: "Enter an valid password", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      message: "Password reset successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Forget-password Error",
      success: false,
      error,
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// APpply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

//notification ctrl
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notifcation = user.notifcation;
    seennotification.push(...notifcation);
    user.notifcation = [];
    user.seennotification = notifcation;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

// delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

//GET ALL DOC
const getAllDocotrsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching DOcotr",
    });
  }
};

//BOOK APPOINTMENT
const bookeAppointmnetController = async (req, res) => {
  try {
    const doctordata = await doctorModel.findOne({ _id: req.body.doctorId });
    var fromtime = doctordata.timings[0].split(":");
    var ampm = doctordata.timings[0].split(" ");
    var totime = doctordata.timings[1].split(":");

    if (
      ampm[1] !== req.body.a ||
      req.body.t < fromtime[0] ||
      req.body.t > totime[0]
    ) {
      res.status(200).send({
        data: req.body.doctorInfo,
        success: false,
        message: "Appointment is not available",
      });
    } else {
      req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      req.body.time = moment(req.body.time, "HH:mm a").toISOString();
      req.body.status = "pending";
      const doctorInfo = req.body.doctorInfo;
      const newAppointment = new appointmentModel(req.body);
      await newAppointment.save();
      const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
      user.notifcation.push({
        type: "New-appointment-request",
        message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
        onCLickPath: "/user/appointments",
      });
      await user.save();
      res.status(200).send({
        appointments: newAppointment,
        success: true,
        message: "Appointment Book succesfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

// booking bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
  try {
    const doctordata = await doctorModel.findOne({ _id: req.body.doctorId });
    var fromtime = doctordata.timings[0].split(":");
    var ampm = doctordata.timings[0].split(" ");
    var totime = doctordata.timings[1].split(":");

    if (
      ampm[1] !== req.body.a ||
      req.body.t < fromtime[0] ||
      req.body.t > totime[0]
    ) {
      res.status(200).send({
        success: false,
        message: "Appointment is not available",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Appointment is available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Booking",
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
  forgetpasswordController,
};
