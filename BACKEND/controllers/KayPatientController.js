const KayPatient = require("../models/KayPatient");

// Register a new patient
exports.registerPatient = async (req, res) => {
    try {
        const newPatient = new KayPatient(req.body);
        await newPatient.save();
        res.status(201).json({ message: "Patient registered successfully", patient: newPatient });
    } catch (error) {
        res.status(500).json({ error: "Error registering patient", details: error.message });
    }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await KayPatient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: "Error fetching patients", details: error.message });
    }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
    try {
        const patient = await KayPatient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: "Error fetching patient details", details: error.message });
    }
};

// Update patient details
exports.updatePatient = async (req, res) => {
    try {
        const updatedPatient = await KayPatient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
    } catch (error) {
        res.status(500).json({ error: "Error updating patient", details: error.message });
    }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
    try {
        const deletedPatient = await KayPatient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting patient", details: error.message });
    }
};
