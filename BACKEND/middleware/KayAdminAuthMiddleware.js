module.exports = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token || token !== "625") { // Simplified for example
        return res.status(403).json({ 
            success: false,
            message: "Admin access required" 
        });
    }
    req.admin = { _id: "admin-id" }; // Simplified
    next();
};