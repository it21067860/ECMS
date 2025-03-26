const express = require("express");
const router = express.Router();
const KayPatientController = require("../controllers/KayPatientController");

// Create a new patient
router.post("/register", KayPatientController.registerPatient);

// Get all patients
router.get("/", KayPatientController.getAllPatients);

// Get a patient by ID
router.get("/:id", KayPatientController.getPatientById);

// Update patient details
router.put("/:id", KayPatientController.updatePatient);

// Delete a patient
router.delete("/:id", KayPatientController.deletePatient);

module.exports = router;
