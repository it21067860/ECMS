const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/KayPaymentController");
const authMiddleware = require("../middleware/authMiddleware");

// Donor routes
router.post("/donate", authMiddleware, paymentController.createDonation);
router.get("/donations", authMiddleware, paymentController.getDonationsByUser);
router.put("/donations/:id", authMiddleware, paymentController.updateDonation);
router.delete("/donations/:id", authMiddleware, paymentController.deleteDonation);

// Admin routes
router.get("/admin/donations", authMiddleware, paymentController.getAllDonations);
router.put("/admin/donations/:id/accept", authMiddleware, paymentController.acceptDonation);
router.put("/admin/donations/:id/reject", authMiddleware, paymentController.rejectDonation);
router.get("/admin/reports", authMiddleware, paymentController.generateReport);

module.exports = router;