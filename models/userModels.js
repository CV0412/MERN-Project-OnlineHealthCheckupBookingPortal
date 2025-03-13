const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  number: {
    type: String,
    required: [true, "Number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  notifcation: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});

const userModel = mongoose.model("users", userSchema);

// Create default admin user if the collection is empty
async function createAdminIfNeeded() {
  const count = await userModel.countDocuments(); // Check if any user exists in the collection

  if (count === 0) {
    // If no users exist, create the default admin user
    const password = "Admin@123"; // Default password for admin user
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    const adminUser = new userModel({
      name: "Admin",
      email: "admin@example.com", // You can change this to any email you'd like
      number: "1234567890", // You can change this to any number
      password: hashedPassword, // Store the hashed password
      isAdmin: true,
      status: true,
      notifcation: [],
      seennotification: [],
    });

    await adminUser.save(); // Save the admin user to the database
    console.log("Admin user created successfully!");

    // Create default user
    const user_password = "User@123"; // Default password for user
    const user_salt = await bcrypt.genSalt(10); // Generate salt
    const user_hashedPassword = await bcrypt.hash(user_password, user_salt); // Hash the password

    const User = new userModel({
      name: "Sample User",
      email: "user@example.com", // You can change this to any email you'd like
      number: "7894561235", // You can change this to any number
      password: user_hashedPassword, // Store the hashed password
      isAdmin: false, // User should not be an admin
      status: true,
      notifcation: [],
      seennotification: [],
    });

    await User.save(); // Save the user to the database
    console.log("User created successfully!");
  }
}

createAdminIfNeeded(); // Call the function to check and create the admin user

module.exports = userModel;
