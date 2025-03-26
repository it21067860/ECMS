const Donation = require("../models/donationModel");
const Home = require("../models/homeManage");

// Create a new donation
const createDonation = async (req, res) => {
  try {
    const {
      homeId,
      amount,
      donorName,
      donorEmail,
      donorPhone,
      paymentMethod,
      paymentDetails,
    } = req.body;

    // Validate home exists
    const home = await Home.findById(homeId);
    if (!home) {
      return res.status(404).json({ error: "Home not found" });
    }

    // Create new donation
    const donation = new Donation({
      homeId,
      amount,
      donorName,
      donorEmail,
      donorPhone,
      paymentMethod,
      paymentDetails,
      status: "pending",
    });

    await donation.save();
    res.status(201).json({
      message: "Donation created successfully",
      donation,
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ error: "Failed to create donation" });
  }
};

// Get all donations (admin only)
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("homeId", "homeName")
      .populate("approvedBy", "name")
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

// Get donations for a specific home
const getHomeDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ homeId: req.params.homeId })
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error("Error fetching home donations:", error);
    res.status(500).json({ error: "Failed to fetch home donations" });
  }
};

// Approve donation (admin only)
const approveDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    donation.status = "approved";
    donation.approvedBy = req.user._id;
    donation.approvedAt = new Date();
    await donation.save();

    res.json({
      message: "Donation approved successfully",
      donation,
    });
  } catch (error) {
    console.error("Error approving donation:", error);
    res.status(500).json({ error: "Failed to approve donation" });
  }
};

// Reject donation (admin only)
const rejectDonation = async (req, res) => {
  try {
    const { rejectionReason } = req.body;
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    donation.status = "rejected";
    donation.rejectionReason = rejectionReason;
    donation.rejectedAt = new Date();
    await donation.save();

    res.json({
      message: "Donation rejected successfully",
      donation,
    });
  } catch (error) {
    console.error("Error rejecting donation:", error);
    res.status(500).json({ error: "Failed to reject donation" });
  }
};

// Get donation statistics (admin only)
const getDonationStats = async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.json(stats);
  } catch (error) {
    console.error("Error fetching donation stats:", error);
    res.status(500).json({ error: "Failed to fetch donation statistics" });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getHomeDonations,
  approveDonation,
  rejectDonation,
  getDonationStats,
};