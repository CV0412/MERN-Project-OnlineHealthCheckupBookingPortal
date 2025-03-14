const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    // Find all users except those with isAdmin: true
    const users = await userModel.find({ isAdmin: { $ne: true } });

    res.status(200).send({
      success: true,
      message: "Users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};

// doctor account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};

//Block user
const blockuserController = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.body.id, {
      status: false,
    });
    if (user) {
      res.status(200).send({
        success: true,
        message: "User has been blocked",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "User has not blocked",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in blocking user",
      error,
    });
  }
};

//Active user
const activeuserController = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.body.id, {
      status: true,
    });
    if (user) {
      res.status(200).send({
        success: true,
        message: "User has been Actived",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "User has not Actived",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in activing user",
      error,
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
  activeuserController,
  blockuserController,
};
