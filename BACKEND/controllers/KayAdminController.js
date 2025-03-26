const KayAdmin = require("../models/KayAdmin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ✅ Admin login
exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username !== "Admin625" || password !== "625") {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign({ username }, "secretKey", { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get all pending caregivers (for admin approval)
exports.getPendingCaregivers = async (req, res) => {
    try {
        const pendingCaregivers = await require("../models/KayCaregiver").find({ isApproved: false });
        res.status(200).json(pendingCaregivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Approve caregiver & send credentials (Admin Only)
exports.approveCaregiver = async (req, res) => {
    try {
        const { username, password } = req.body;
        const caregiver = await require("../models/KayCaregiver").findById(req.params.id);

        if (!caregiver) {
            return res.status(404).json({ message: "Caregiver not found" });
        }

        caregiver.username = username;
        caregiver.password = await bcrypt.hash(password, 10);
        caregiver.isApproved = true;
        await caregiver.save();

        res.status(200).json({ message: "Caregiver approved successfully!", caregiver });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete caregiver request (Admin Only)
exports.deleteCaregiverRequest = async (req, res) => {
    try {
        const deletedCaregiver = await require("../models/KayCaregiver").findByIdAndDelete(req.params.id);
        if (!deletedCaregiver) {
            return res.status(404).json({ message: "Caregiver request not found" });
        }
        res.status(200).json({ message: "Caregiver request deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
