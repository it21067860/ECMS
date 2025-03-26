/*const express = require("express");
const router = express.Router();
const homeManageController = require("../controllers/homeManageController");

// Create a new patient
//router.post("/register", homeManageController.registerHome);

router.post('/homesReg', async (req, res) => {
    try {
      // Process your home data here
      const newHome = await Home.create(req.body);
      res.status(201).json(newHome);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Get all patients
router.get("/", homeManageController.getAllHomes);

// Get a patient by ID
router.get("/:id", homeManageController.getHomeById);

// Update patient details
router.put("/:id", homeManageController.updateHome);

// Delete a patient
router.delete("/:id", homeManageController.deleteHome);

module.exports = router;
*/

const express = require("express");
const router = express.Router();
const homeManageController = require("../controllers/homeManageController");

// POST: Register a new home
router.post("/", homeManageController.registerHome); // Changed from /homesReg to /

// GET: Fetch all homes
router.get("/", homeManageController.getAllHomes);

// GET: Fetch a home by ID
router.get("/:id", homeManageController.getHomeById);

// PUT: Update a home
router.put("/:id", homeManageController.updateHome);

// DELETE: Delete a home
router.delete("/:id", homeManageController.deleteHome);

module.exports = router;