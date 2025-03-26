const express = require("express");
const router = express.Router();
const kayVolunteerController = require("../controllers/KayVolunteerController");
const validateVolunteer = require("../middleware/KayValidateVolunteer"); // Ensure the correct path


// ✅ Register a new volunteer
router.post("/register", validateVolunteer, kayVolunteerController.registerVolunteer);


// ✅ Get all volunteers
router.get("/", kayVolunteerController.getAllVolunteers);

// ✅ Get a volunteer by ID
router.get("/:id", kayVolunteerController.getVolunteerById);

// ✅ Update a volunteer by ID
router.put("/:id", kayVolunteerController.updateVolunteer);

// ✅ Delete a volunteer by ID
router.delete("/:id", kayVolunteerController.deleteVolunteer);

module.exports = router;
