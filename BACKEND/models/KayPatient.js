const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    medicalHistory: { type: String }, 
    emergencyContact: {
        name: { type: String, required: true },
        phone: { type: String, required: true }
    },
    createdAt: { type: Date, default: Date.now }
});

const KayPatient = mongoose.model("KayPatient", patientSchema);
module.exports = KayPatient;
