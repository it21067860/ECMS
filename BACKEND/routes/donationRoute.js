const express = require("express");
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getHomeDonations,
  approveDonation,
  rejectDonation,
  getDonationStats,
} = require("../controllers/donationController");


// Create a new donation
router.post("/create", createDonation);

// Get all donations (admin only)
router.get("/all", getAllDonations);

// Get donations for a specific home
router.get("/home/:homeId", getHomeDonations);

// Approve donation (admin only)
router.patch("/approve/:id", approveDonation);

// Reject donation (admin only)
router.patch("/reject/:id", rejectDonation);

// Get donation statistics (admin only)
router.get("/stats",getDonationStats);

module.exports = router;