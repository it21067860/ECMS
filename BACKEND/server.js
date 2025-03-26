const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const FormDataModel = require("./models/FormData");
const HomeModel = require("./models/homeManage"); // Correct model import

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8079;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Explicit CORS for React
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const logger = require("./middleware/KayLogger");
app.use(logger);

// Serve static files (if using file uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

mongoose.connection.once("open", () => {
  console.log("MongoDB connected successfully!");
});

// Routes
app.use("/api/formData", require("./routes/donationRoute"));
app.use("/api/users", require("./routes/KayUserRoutes"));
app.use("/api/caregivers", require("./routes/KayCaregiverRoutes"));
app.use("/api/volunteers", require("./routes/KayVolunteerRoutes"));
app.use("/api/patients", require("./routes/KayPatientRoutes"));
app.use("/api/homesReg", require("./routes/homeManageRoutes")); // Mount routes here
app.use("/api/donations", require("./routes/donationRoute"));

// Login/Register Routes
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email })
    .then((user) => {
      if (user) {
        res.json("Already registered");
      } else {
        FormDataModel.create(req.body)
          .then((log_reg_form) => res.json(log_reg_form))
          .catch((err) => res.json(err));
      }
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("Wrong password");
        }
      } else {
        res.json("No records found!");
      }
    });
});

// Start Server (only once, outside any route)
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});