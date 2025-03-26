const Donation = require("../models/Donation");
const Home = require("../models/Home");

// Create a donation
exports.createDonation = async (req, res) => {
    try {
        const { amount, currency, paymentMethod, transactionId, homeId } = req.body;
        const donation = new Donation({
            donorId: req.user.id,
            amount,
            currency,
            paymentMethod,
            transactionId,
            homeId
        });
        await donation.save();

        // Update home's total donations
        const home = await Home.findById(homeId);
        home.totalDonations += amount;
        await home.save();

        res.status(201).json({ message: "Donation created successfully!", donation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get donations by user
exports.getDonationsByUser = async (req, res) => {
    try {
        const donations = await Donation.find({ donorId: req.user.id });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update donation (only for donor)
exports.updateDonation = async (req, res) => {
    try {
        const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Donation updated successfully!", donation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete donation (only for donor)
exports.deleteDonation = async (req, res) => {
    try {
        await Donation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Donation deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin: Get all donations
exports.getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin: Accept donation
exports.acceptDonation = async (req, res) => {
    try {
        const donation = await Donation.findByIdAndUpdate(req.params.id, { status: "Accepted" }, { new: true });
        res.status(200).json({ message: "Donation accepted!", donation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin: Reject donation (and refund)
exports.rejectDonation = async (req, res) => {
    try {
        const donation = await Donation.findByIdAndUpdate(req.params.id, { status: "Rejected" }, { new: true });
        // Implement refund logic here (e.g., using PayPal API)
        res.status(200).json({ message: "Donation rejected and refunded!", donation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin: Generate monthly report
exports.generateReport = async (req, res) => {
    try {
        const donations = await Donation.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};