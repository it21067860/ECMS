const KayVolunteer = require("../models/KayVolunteer");

// ✅ Register a new volunteer
exports.registerVolunteer = async (req, res) => {
    try {
        const volunteer = new KayVolunteer(req.body);
        await volunteer.save();
        res.status(201).json({ message: "Volunteer registered successfully!", volunteer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Get all volunteers
exports.getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await KayVolunteer.find();
        res.status(200).json(volunteers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get volunteer by ID
exports.getVolunteerById = async (req, res) => {
    try {
        const volunteer = await KayVolunteer.findById(req.params.id);
        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }
        res.status(200).json(volunteer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update volunteer by ID
exports.updateVolunteer = async (req, res) => {
    try {
        const updatedVolunteer = await KayVolunteer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVolunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }
        res.status(200).json({ message: "Volunteer updated successfully", updatedVolunteer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Delete volunteer by ID
exports.deleteVolunteer = async (req, res) => {
    try {
        const deletedVolunteer = await KayVolunteer.findByIdAndDelete(req.params.id);
        if (!deletedVolunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }
        res.status(200).json({ message: "Volunteer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
