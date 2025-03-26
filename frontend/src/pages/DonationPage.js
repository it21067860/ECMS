// src/pages/DonationPage.js
const React = require("react");
const { useEffect, useState } = require("react");
const { useParams, useNavigate } = require("react-router-dom");
const DonationForm = require("../components/DonationForm").default;
const { fetchHomeById } = require("../api");
require("../styles.css"); // Import CSS

const DonationPage = () => {
  const { homeId } = useParams();
  const [home, setHome] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadHome = async () => {
      try {
        const data = await fetchHomeById(homeId);
        if (!data || !data._id) {
          setError("Home not found.");
        } else {
          setHome(data);
        }
      } catch (err) {
        setError("Failed to load home: " + err.message);
      }
    };
    loadHome();
  }, [homeId]);

  const handleDonate = (donationData) => {
    if (!donationData.amount || !donationData.currency) return;
    navigate(`/payment/${homeId}`, { state: donationData });
  };

  if (error) return React.createElement("p", { style: { color: "red" } }, error);
  if (!home) return React.createElement("p", null, "Loading...");

  return React.createElement(
    "div",
    { className: "donation-page" },
    React.createElement("h1", null, `Donate to ${home.name}`),
    React.createElement("p", null, `Total Donations: $${home.totalDonations || 0}`),
    React.createElement("p", null, `Patients: ${home.patientCount || 0}`),
    React.createElement(DonationForm, { onDonate: handleDonate })
  );
};

module.exports = DonationPage;