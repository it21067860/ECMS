// src/components/AdminDonation.js
const React = require("react");
const { acceptDonation, rejectDonation } = require("../api");
require("../styles.css"); // Import CSS

const AdminDonation = ({ donation }) => {
  const handleAccept = async () => {
    try {
      if (donation.status !== "Pending") return;
      await acceptDonation(donation._id);
      alert("Donation accepted successfully!");
    } catch (err) {
      alert("Failed to accept donation: " + err.message);
    }
  };

  const handleReject = async () => {
    try {
      if (donation.status !== "Pending") return;
      await rejectDonation(donation._id);
      alert("Donation rejected successfully!");
    } catch (err) {
      alert("Failed to reject donation: " + err.message);
    }
  };

  return React.createElement(
    "div",
    { className: "admin-donation" },
    React.createElement("p", null, `Donor: ${donation.donorId || "Unknown"}`),
    React.createElement("p", null, `Amount: ${donation.amount || 0} ${donation.currency || ""}`),
    React.createElement("p", null, `Status: ${donation.status || "Unknown"}`),
    donation.status === "Pending" &&
      React.createElement(
        React.Fragment,
        null,
        React.createElement("button", { onClick: handleAccept }, "Accept"),
        React.createElement("button", { onClick: handleReject }, "Reject")
      )
  );
};

module.exports = AdminDonation;