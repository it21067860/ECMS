// Middleware to validate caregiver registration data
const validateCaregiver = (req, res, next) => {
    const { fullName, email, nicNumber, phone, address, availability, experienceYears, medicalSkills, acceptTerms } = req.body;

    if (!fullName || !email || !nicNumber || !phone || !address || !availability || !experienceYears || !medicalSkills) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    if (!acceptTerms) {
        return res.status(400).json({ error: "You must accept the terms and conditions!" });
    }

    next();
};

module.exports = validateCaregiver;
