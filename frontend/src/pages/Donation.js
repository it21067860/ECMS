import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Donation.css";
import NAV from "./Nav";
import { getHomes } from "../api/homeManageService"; // Import API service

const Donation = () => {
  const [homes, setHomes] = useState([]); // State for home data
  const [selectedHome, setSelectedHome] = useState(null); // State for popup
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [paymentDetails, setPaymentDetails] = useState({
    accountNumber: "",
    amount: "",
  }); // Payment form state

  // Fetch homes from backend on mount
  useEffect(() => {
    const fetchHomes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHomes();
        console.log("Fetched homes:", data);
        setHomes(data);
      } catch (err) {
        console.error("Error fetching homes:", err);
        setError("Failed to load homes. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchHomes();
  }, []);

  // Open popup with selected home
  const handleCardClick = (home) => {
    setSelectedHome(home);
  };

  // Close popup
  const closePopup = () => {
    setSelectedHome(null);
    setPaymentDetails({ accountNumber: "", amount: "" }); // Reset payment form
  };

  // Handle payment input changes
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Simulate payment submission (replace with actual payment logic later)
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentDetails.accountNumber || !paymentDetails.amount) {
      alert("Please fill in all payment details.");
      return;
    }
    console.log("Payment submitted for:", selectedHome.homeName, paymentDetails);
    alert(`Payment of $${paymentDetails.amount} submitted to ${selectedHome.homeName}!`);
    closePopup(); // Close popup after "payment"
  };

  return (
    <div className="flex-container">
      <NAV />
      <div className="home-container1">
        <h1 className="home-heading">Welcome to Safe Heaven</h1>
        <p className="home-subtext">Donate What You Have and Help Us</p>
      </div>

      <div className="services-container">
        {loading && <p>Loading homes...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Static cards */}
   

        {/* Dynamic home cards */}
        {homes.length > 0 ? (
          homes.map((home) => (
            <div key={home._id} className="service-card" onClick={() => handleCardClick(home)}>
              <h3>{home.homeName}</h3>
              <p>{home.homeDescription}</p>
              <p>Type: {home.homeType}</p>
              <button className="service-link">View Details</button>
            </div>
          ))
        ) : (
          !loading && <p>No homes found.</p>
        )}

   

        <div className="service-card">
          <h3>Donation</h3>
          <p>Become a donor and help us continue our mission of providing care and support.</p>
          <Link to="/register-doner" className="service-link">Learn More</Link>
        </div>
      </div>

      {/* Popup for home details */}
      {selectedHome && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{selectedHome.homeName}</h3>
            <p><strong>Description:</strong> {selectedHome.homeDescription}</p>
            <p><strong>Type:</strong> {selectedHome.homeType}</p>
            <p><strong>Account Number:</strong> {selectedHome.homeOwnerContact || "1234-5678-9012"}</p> {/* Placeholder if no account field */}

            <h4>Make a Donation</h4>
            <form onSubmit={handlePaymentSubmit}>
              <label>
                Your Account Number:
                <input
                  type="text"
                  name="accountNumber"
                  value={paymentDetails.accountNumber}
                  onChange={handlePaymentChange}
                  placeholder="Enter your account number"
                  required
                />
              </label>
              <label>
                Amount ($):
                <input
                  type="number"
                  name="amount"
                  value={paymentDetails.amount}
                  onChange={handlePaymentChange}
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </label>
              <div className="popup-buttons">
                <button type="submit" className="pay-button">Pay Now</button>
                <button type="button" onClick={closePopup} className="close-button">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline CSS for popup (add to Donation.css for better styling)
const popupStyles = `
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .popup-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .popup-content h3 {
    margin-top: 0;
  }
  .popup-content label {
    display: block;
    margin: 10px 0;
  }
  .popup-content input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .popup-buttons {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }
  .pay-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .close-button {
    padding: 10px 20px;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

// Inject styles (temporary; move to Donation.css later)
const styleSheet = document.createElement("style");
styleSheet.textContent = popupStyles;
document.head.appendChild(styleSheet);

export default Donation;