const express = require("express");
const router = express.Router();
const kayCaregiverController = require("../controllers/KayCaregiverController");  // ✅ FIXED
const validateCaregiver = require("../middleware/KayValidation");  // ✅ FIXED

// ✅ Register a new caregiver
router.post("/register", validateCaregiver, kayCaregiverController.registerCaregiver);

// ✅ Get all caregivers
router.get("/", kayCaregiverController.getAllCaregivers);

// ✅ Get a caregiver by ID
router.get("/:id", kayCaregiverController.getCaregiverById);

// ✅ Update a caregiver by ID
router.put("/:id", kayCaregiverController.updateCaregiver);

// ✅ Delete a caregiver by ID
router.delete("/:id", kayCaregiverController.deleteCaregiver);

module.exports = router;
