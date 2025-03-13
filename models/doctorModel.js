const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModels");

// Doctor Schema
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    feesPerCunsaltation: {
      type: Number,
      required: [true, "Fee is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "Work timing is required"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);

// Create default doctor user and doctor record in the doctors collection
async function createDoctorIfNeeded() {
  const doctorCount = await doctorModel.countDocuments(); // Check if any user exists in the users collection

  if (doctorCount === 0) {
    // Create a default doctor user if no users exist
    const password = "Doctor@123"; // Default password for doctor
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    const doctorUser = new userModel({
      name: "Sample Doctor User",
      email: "doctor@example.com", // You can change this to any email you'd like
      number: "7894561235", // You can change this to any number
      password: hashedPassword, // Store the hashed password
      isAdmin: false, // Doctor should not be an admin
      isDoctor: true, // This user is a doctor
      status: true,
      notifcation: [],
      seennotification: [],
    });

    await doctorUser.save(); // Save the doctor user to the database
    console.log("Doctor User created successfully!");

    // Create a corresponding doctor record in the doctors collection
    const doctorRecord = new doctorModel({
      userId: doctorUser._id, // Link the doctor record to the user using userId
      firstName: "Sample", // You can change this to the doctor's first name
      lastName: "Doctor", // You can change this to the doctor's last name
      phone: "7894561235", // You can change this to the doctor's phone number
      email: "doctor@example.com", // Email (same as user)
      website: "www.sampledoctor.com", // You can change the doctor's website
      address: "123 Sample St, City", // You can change the address
      specialization: "Cardiology", // You can change the specialization
      experience: "5 years", // You can change the experience
      feesPerCunsaltation: 100, // You can change the fee
      status: "approved", // You can change the status (e.g., active, pending)
      timings: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        // Add other days here
      },
    });

    // Save the doctor record to the database
    await doctorRecord.save();
    console.log("Doctor Record created successfully!");
  }
}

createDoctorIfNeeded(); // Call the function to check and create the doctor user and record

module.exports = doctorModel;
