import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Donation.css";
import NAV from "./Nav";
import { getHomes } from "../api/homeManageService";

const Donation = () => {
  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showPaymentInfoPopup, setShowPaymentInfoPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // New state for confirmation popup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    accountNumber: "",
    amount: "",
    currency: "USD",
    paymentMethod: "Credit Card",
    cardHolderName: "",
    cardType: "Visa",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

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

  const handleCardClick = (home) => {
    setSelectedHome(home);
  };

  const closePopup = () => {
    setSelectedHome(null);
    setShowPaymentPopup(false);
    setShowPaymentInfoPopup(false);
    setShowConfirmationPopup(false);
    setPaymentDetails({
      accountNumber: "",
      amount: "",
      currency: "USD",
      paymentMethod: "Credit Card",
      cardHolderName: "",
      cardType: "Visa",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentDetails.amount) {
      alert("Please enter an amount.");
      return;
    }
    setShowPaymentPopup(false);
    setShowPaymentInfoPopup(true);
  };

  const handlePaymentInfoSubmit = (e) => {
    e.preventDefault();
    if (
      !paymentDetails.cardHolderName ||
      !paymentDetails.cardNumber ||
      !paymentDetails.expiryDate ||
      !paymentDetails.cvc
    ) {
      alert("Please fill in all payment information.");
      return;
    }
    setShowPaymentInfoPopup(false);
    setShowConfirmationPopup(true); // Open the confirmation popup
  };

  const openPaymentPopup = () => {
    setShowPaymentPopup(true);
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
          <p>Become a donor and help us continue our mission.</p>
          <Link to="/register-doner" className="service-link">Learn More</Link>
        </div>
      </div>

      {/* First Popup: Home Details */}
      {selectedHome && !showPaymentPopup && !showPaymentInfoPopup && !showConfirmationPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{selectedHome.homeName}</h3>
            <p><strong>Description:</strong> {selectedHome.homeDescription}</p>
            <p><strong>Type:</strong> {selectedHome.homeType}</p>
            <p><strong>Account Number:</strong> {selectedHome.accountNumber || "1234-5678-9012"}</p>
            <p><strong>Year target:</strong></p>
            <p><strong>Raised:</strong></p>

            <div className="popup-buttons">
              <button className="pay-button" onClick={openPaymentPopup}>
                Proceed to Donate
              </button>
              <button type="button" onClick={closePopup} className="close-button">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Second Popup: Make Your Donation */}
      {selectedHome && showPaymentPopup && !showPaymentInfoPopup && !showConfirmationPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Make Your Donation to {selectedHome.homeName}</h3>
            <p><strong>Type:</strong> {selectedHome.homeType}</p>
            <p><strong>Description:</strong> {selectedHome.homeDescription}</p>

            <form onSubmit={handlePaymentSubmit}>
              <label>
                Currency:
                <select
                  name="currency"
                  value={paymentDetails.currency}
                  onChange={handlePaymentChange}
                  style={{ marginLeft: "10px" }}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </label>
              <label>
                Amount:
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
                <button type="submit" className="pay-button">Donate Now</button>
                <button type="button" onClick={closePopup} className="close-button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Third Popup: Payment Information */}
      {selectedHome && showPaymentInfoPopup && !showConfirmationPopup && (
        <div className="popup-overlay">
          <div className="popup-content payment-info-popup">
            <h3 className="payment-info-header">Payment Information</h3>

            <div className="donation-summary">
              <h4>Donation Summary</h4>
              <p><strong>Amount:</strong> {paymentDetails.currency} {paymentDetails.amount}</p>
              <p><strong>Recipient:</strong> {selectedHome.homeName}</p>
              <p><strong>Payment Method:</strong> {paymentDetails.paymentMethod}</p>
            </div>

            <div className="payment-method-section">
              <h4>Payment Method</h4>
              <div className="payment-method-options">
                <button
                  type="button"
                  className={`method-button ${paymentDetails.paymentMethod === "Credit Card" ? "active" : ""}`}
                  onClick={() => setPaymentDetails((prev) => ({ ...prev, paymentMethod: "Credit Card" }))}
                >
                  <span className="icon">💳</span> Credit Card
                </button>
                <button
                  type="button"
                  className={`method-button ${paymentDetails.paymentMethod === "Bank Transfer" ? "active" : ""}`}
                  onClick={() => setPaymentDetails((prev) => ({ ...prev, paymentMethod: "Bank Transfer" }))}
                >
                  <span className="icon">🏦</span> Bank Transfer
                </button>
              </div>
            </div>

            {paymentDetails.paymentMethod === "Credit Card" && (
              <form onSubmit={handlePaymentInfoSubmit}>
                <label>
                  Name on Card
                  <input
                    type="text"
                    name="cardHolderName"
                    value={paymentDetails.cardHolderName}
                    onChange={handlePaymentChange}
                    placeholder="John Doe"
                    required
                  />
                </label>
                <label>
                  Card Type
                  <select
                    name="cardType"
                    value={paymentDetails.cardType}
                    onChange={handlePaymentChange}
                  >
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                    <option value="Amex">Amex</option>
                  </select>
                </label>
                <label>
                  Card Number
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="1234-5678-9012-3456"
                    required
                  />
                </label>
                <div className="expiry-cvc">
                  <label>
                    Expiry Date
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentDetails.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      required
                    />
                  </label>
                  <label>
                    CVC
                    <input
                      type="text"
                      name="cvc"
                      value={paymentDetails.cvc}
                      onChange={handlePaymentChange}
                      placeholder="123"
                      required
                    />
                  </label>
                </div>
                <div className="popup-buttons">
                  <button type="submit" className="complete-donation-button">
                    <span className="lock-icon">🔒</span> Complete Donation
                  </button>
                  <button type="button" onClick={closePopup} className="close-button">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Fourth Popup: Donation Confirmation */}
      {selectedHome && showConfirmationPopup && (
        <div className="popup-overlay">
          <div className="popup-content payment-info-popup">
            <h3 className="payment-info-header">Donation Confirmation</h3>

            <div className="donation-summary">
              <h4>Donation Summary</h4>
              <p><strong>Amount:</strong> {paymentDetails.currency} {paymentDetails.amount}</p>
              <p><strong>Recipient:</strong> {selectedHome.homeName}</p>
              <p><strong>Payment Method:</strong> {paymentDetails.paymentMethod}</p>
              <p><strong>Status:</strong> Donation Successful!</p>
            </div>

            <div className="confirmation-message">
              <p>Thank you for your generous donation to {selectedHome.homeName}!</p>
              <p>Your support helps us continue our mission.</p>
            </div>

            <div className="popup-buttons">
              <button onClick={closePopup} className="complete-donation-button">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Updated styles
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
  .payment-info-popup {
    border-top: 4px solid #007bff;
  }
  .payment-info-header {
    margin-top: 0;
    color: #333;
  }
  .donation-summary {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .donation-summary h4 {
    margin: 0 0 10px;
    font-size: 16px;
  }
  .donation-summary p {
    margin: 5px 0;
    font-size: 14px;
  }
  .confirmation-message {
    text-align: center;
    margin-bottom: 20px;
  }
  .confirmation-message p {
    margin: 5px 0;
    font-size: 14px;
  }
  .payment-method-section h4 {
    margin: 0 0 10px;
    font-size: 16px;
  }
  .payment-method-options {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .method-button {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .method-button.active {
    background: #e6f0fa;
    border-color: #007bff;
  }
  .method-button .icon {
    font-size: 20px;
  }
  .popup-content label {
    display: block;
    margin: 10px 0;
  }
  .popup-content input, .popup-content select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .expiry-cvc {
    display: flex;
    gap: 10px;
  }
  .expiry-cvc label {
    flex: 1;
  }
  .popup-buttons {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
  .pay-button, .complete-donation-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .pay-button:hover, .complete-donation-button:hover {
    background-color: #218838;
  }
  .complete-donation-button .lock-icon {
    font-size: 16px;
  }
  .close-button {
    padding: 10px 20px;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .close-button:hover {
    background-color: #5a6268;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = popupStyles;
document.head.appendChild(styleSheet);

export default Donation;