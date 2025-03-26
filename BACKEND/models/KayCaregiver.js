const mongoose = require("mongoose");

const KayCaregiverSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nicNumber: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    experienceYears: {
        type: Number,
        required: true
    },
    medicalSkills: {
        type: [String], // Example: ["Elderly care", "First aid", "Nursing"]
        required: true
    },
    preferredElderlyConditions: {
        type: [String], // Example: ["Dementia", "Mobility issues"]
        required: false
    },
    acceptTerms: {
        type: Boolean,
        required: true,
        validate: {
            validator: function (value) {
                return value === true; // Must be checked
            },
            message: "You must accept the terms and conditions."
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("KayCaregiver", KayCaregiverSchema);
