/*const homeManage = require("../models/homeManage");

// ✅ Register a new home
exports.registerHome = async (req, res) => {
    try {
        console.log("Received request body:", req.body); // ✅ Debugging line
        const home = new homeManage(req.body);
        await home.save();
        res.status(201).json({ message: "Elder Home registered successfully!", home });
    } catch (error) {
        console.error("Error in registration:", error.message); // ✅ Log error details
        res.status(400).json({ error: error.message });
    }
};

// ✅ Get all Homea
exports.getAllHomes = async (req, res) => {
    try {
        const homes = await homeManage.find();
        res.status(200).json(homes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Home by ID
exports.getHomeById = async (req, res) => {
    try {
        const home = await homeManage.findById(req.params.id);
        if (!home) {
            return res.status(404).json({ message: "Elder Home not found" });
        }
        res.status(200).json(home);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update caregiver by ID
exports.updateHome = async (req, res) => {
    try {
        const updatedHome = await homeManage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHome) {
            return res.status(404).json({ message: "Elder Home not found" });
        }
        res.status(200).json({ message: "Elder Home updated successfully", updatedHome });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Delete caregiver by ID
exports.deleteHome = async (req, res) => {
    console.log("Deleting home with ID:", req.params.id); // ✅ Debugging line
    try {
        const deletedHome = await homeManage.findByIdAndDelete(req.params.id);
        if (!deletedHome) {
            return res.status(404).json({ message: "Elder Home not found" });
        }
        res.status(200).json({ message: "Elder Home deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/

const HomeModel = require("../models/homeManage"); // Corrected model name

// Register a new home
exports.registerHome = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const home = new HomeModel({ ...req.body, approved: false }); // Ensure approved defaults to false
    await home.save();
    res.status(201).json({ message: "Elder Home registered successfully!", home });
  } catch (error) {
    console.error("Error in registration:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get all homes
exports.getAllHomes = async (req, res) => {
  try {
    const homes = await HomeModel.find();
    console.log("Sending homes:", homes.length); // Match server.js logging
    res.status(200).json(homes);
  } catch (error) {
    console.error("Error fetching homes:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get home by ID
exports.getHomeById = async (req, res) => {
  try {
    const home = await HomeModel.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ message: "Elder Home not found" });
    }
    res.status(200).json(home);
  } catch (error) {
    console.error("Error fetching home:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update home by ID
exports.updateHome = async (req, res) => {
  try {
    const updatedHome = await HomeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHome) {
      return res.status(404).json({ message: "Elder Home not found" });
    }
    res.status(200).json({ message: "Elder Home updated successfully", updatedHome });
  } catch (error) {
    console.error("Error updating home:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Delete home by ID
exports.deleteHome = async (req, res) => {
  console.log("Deleting home with ID:", req.params.id);
  try {
    const deletedHome = await HomeModel.findByIdAndDelete(req.params.id);
    if (!deletedHome) {
      return res.status(404).json({ message: "Elder Home not found" });
    }
    res.status(200).json({ message: "Elder Home deleted successfully", data: deletedHome });
  } catch (error) {
    console.error("Error deleting home:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;