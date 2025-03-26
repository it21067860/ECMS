// src/pages/AdminPage.js
const React = require("react");
const { useEffect, useState } = require("react");
const AdminDonation = require("../components/AdminDonation").default;
const { getAllDonations } = require("../api");
require("../styles.css"); // Import CSS

const AdminPage = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDonations = async () => {
      try {
        const data = await getAllDonations();
        if (!Array.isArray(data)) {
          setError("No donations available.");
        } else {
          setDonations(data);
        }
      } catch (err) {
        setError("Failed to load donations: " + err.message);
      }
    };
    loadDonations();
  }, []);

  return React.createElement(
    "div",
    { className: "admin-page" },
    React.createElement("h1", null, "Admin Donation Dashboard"),
    error
      ? React.createElement("p", { style: { color: "red" } }, error)
      : donations.map((donation) =>
          React.createElement(AdminDonation, { key: donation._id, donation })
        )
  );
};

module.exports = AdminPage;