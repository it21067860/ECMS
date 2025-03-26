const User = require("../models/KayUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

// Set up storage engine for profile pictures
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage }).single("profilePic");

// User Registration
exports.registerUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: "File upload error", error: err });

    // Log request body to check if data is received
    console.log("Received Data:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided" });
    }

    const { fullName, nic, email, address, password, role } = req.body;
    if (!fullName || !nic || !email || !address || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({
      fullName,
      nic,
      email,
      address,
      password,
      role,
      profilePic: req.file ? req.file.path : null
    });

    await user.save();
    const token = user.getSignedJwtToken();
    res.status(201).json({ token, user });
  });
};


// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = user.getSignedJwtToken();
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
