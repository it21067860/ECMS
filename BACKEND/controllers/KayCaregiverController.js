const KayCaregiver = require("../models/KayCaregiver");

// ✅ Register a new caregiver
exports.registerCaregiver = async (req, res) => {
    try {
        console.log("Received request body:", req.body); // ✅ Debugging line
        const caregiver = new KayCaregiver(req.body);
        await caregiver.save();
        res.status(201).json({ message: "Caregiver registered successfully!", caregiver });
    } catch (error) {
        console.error("Error in registration:", error.message); // ✅ Log error details
        res.status(400).json({ error: error.message });
    }
};

// ✅ Get all caregivers
exports.getAllCaregivers = async (req, res) => {
    try {
        const caregivers = await KayCaregiver.find();
        res.status(200).json(caregivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get caregiver by ID
exports.getCaregiverById = async (req, res) => {
    try {
        const caregiver = await KayCaregiver.findById(req.params.id);
        if (!caregiver) {
            return res.status(404).json({ message: "Caregiver not found" });
        }
        res.status(200).json(caregiver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update caregiver by ID
exports.updateCaregiver = async (req, res) => {
    try {
        const updatedCaregiver = await KayCaregiver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCaregiver) {
            return res.status(404).json({ message: "Caregiver not found" });
        }
        res.status(200).json({ message: "Caregiver updated successfully", updatedCaregiver });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Delete caregiver by ID
exports.deleteCaregiver = async (req, res) => {
    try {
        const deletedCaregiver = await KayCaregiver.findByIdAndDelete(req.params.id);
        if (!deletedCaregiver) {
            return res.status(404).json({ message: "Caregiver not found" });
        }
        res.status(200).json({ message: "Caregiver deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
