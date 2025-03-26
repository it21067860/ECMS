const express = require("express");
const router = express.Router();
const kayAdminController = require("../controllers/KayAdminController");
const verifyAdmin = require("../middleware/KayAuthMiddleware");

// ✅ Admin Login
router.post("/login", kayAdminController.adminLogin);

// ✅ Get all pending caregiver registrations
router.get("/pending-caregivers", verifyAdmin, kayAdminController.getPendingCaregivers);

// ✅ Approve caregiver (Admin Only)
router.put("/approve-caregiver/:id", verifyAdmin, kayAdminController.approveCaregiver);

// ✅ Delete caregiver request (Admin Only)
router.delete("/delete-caregiver/:id", verifyAdmin, kayAdminController.deleteCaregiverRequest);

module.exports = router;
