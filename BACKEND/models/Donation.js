const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the donor
    homeId: { type: mongoose.Schema.Types.ObjectId, ref: "Home", required: true }, // Reference to the home
    amount: { type: Number, required: true },
    currency: { type: String, required: true, enum: ["USD", "EUR", "LKR"] }, // Supported currencies
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    paymentMethod: { type: String, enum: ["PayPal", "Card"], required: true },
    transactionId: { type: String, required: true }, // Payment gateway transaction ID
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);