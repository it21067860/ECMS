const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  homeName: { type: String, required: true, trim: true },
  homeAddress: { type: String, required: true, trim: true },
  homeContact: { type: String, required: true }, // Stored as JSON string
  homeEmail: { 
    type: String, 
    required: true, 
    trim: true, 
    match: [/.+\@.+\..+/, "Please enter a valid email address"] 
  },
  homeCapacity: { type: Number, required: true, min: 1 },
  homeType: { 
    type: String, 
    required: true, 
    enum: ["ELDER_HOME", "ORPHANAGE"] 
  },
  homeStatus: { 
    type: String, 
    default: "Active", 
    enum: ["Active", "Inactive"] 
  },
  homeDescription: { type: String, required: true, trim: true },
  homeImage1: { type: String }, // Base64 string
  homeImage2: { type: String }, // Base64 string
  homeLocation: { type: String, required: true, trim: true },
  homePrice: { type: Number, required: true, min: 0 },
  homeRating: { type: String, default: "Not Rated" }, // Default value
  homeServices: { type: String, required: true, trim: true },
  homeFacilities: { type: String, required: true, trim: true },
  accountNumber: { type: String, required: true },
  homeOwner: { type: String, required: true, trim: true },
  homeOwnerContact: { type: String, required: true, trim: true },
  homeOwnerEmail: { 
    type: String, 
    required: true, 
    trim: true, 
    match: [/.+\@.+\..+/, "Please enter a valid email address"] 
  },
  homeOwnerImage: { type: String }, // Base64 string
  approved: { type: Boolean, default: false }, // Approval status
  totalDonations: {
    type: Number,
    default: 0,
  },
  pendingDonations: {
    type: Number,
    default: 0,
  },
  approvedDonations: {
    type: Number,
    default: 0,
  },
  rejectedDonations: {
    type: Number,
    default: 0,
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Home", HomeSchema);