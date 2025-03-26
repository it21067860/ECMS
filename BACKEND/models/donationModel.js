const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    homeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    donorName: {
      type: String,
      required: true,
    },
    donorEmail: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    donorPhone: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Credit Card", "Debit Card", "Bank Transfer"],
    },
    paymentDetails: {
      cardNumber: {
        type: String,
        required: function() {
          return this.paymentMethod !== "Bank Transfer";
        },
      },
      expiryDate: {
        type: String,
        required: function() {
          return this.paymentMethod !== "Bank Transfer";
        },
      },
      cvv: {
        type: String,
        required: function() {
          return this.paymentMethod !== "Bank Transfer";
        },
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
    },
    rejectedAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
donationSchema.index({ homeId: 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ createdAt: -1 });

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation; 