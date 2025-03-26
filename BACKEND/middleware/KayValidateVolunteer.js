// Middleware to validate volunteer registration data
const validateVolunteer = (req, res, next) => {
    const { fullName, email, nicNumber, phone, address, availability, category, acceptTerms } = req.body;

    if (!fullName || !email || !nicNumber || !phone || !address || !availability || !category) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    if (!acceptTerms) {
        return res.status(400).json({ error: "You must accept the terms and conditions!" });
    }

    next();
};

module.exports = validateVolunteer;
