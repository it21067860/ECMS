import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getHomeById } from "../api/homeManageService";
import { createDonation } from "../api/donationServis";

const AddDonation = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    paymentMethod: "Credit Card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    const fetchHomeDetails = async () => {
      if (!id) {
        setError("No home ID provided");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching home details for ID:", id);
        const data = await getHomeById(id);
        console.log("Received home data:", data);
        if (!data) {
          throw new Error("No data received from server");
        }
        setHome(data);
      } catch (err) {
        console.error("Error in fetchHomeDetails:", err);
        setError(err.message || "Failed to load home details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const donationPayload = {
        homeId: id,
        amount: parseFloat(formData.amount),
        donorName: formData.donorName,
        donorEmail: formData.donorEmail,
        donorPhone: formData.donorPhone,
        paymentMethod: formData.paymentMethod,
        paymentDetails: formData.paymentMethod !== "Bank Transfer" ? {
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv
        } : {}
      };

      await createDonation(donationPayload);
      alert("Donation submitted successfully! Waiting for admin approval.");
      navigate("/danation-view");
    } catch (err) {
      console.error("Error submitting donation:", err);
      setError(err.message || "Failed to submit donation. Please try again.");
    }
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#333",
    },
    homeDetails: {
      backgroundColor: "#f5f5f5",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "30px",
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "white",
      borderRadius: "4px",
    },
    label: {
      fontWeight: "bold",
      color: "#666",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    input: {
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    submitButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "20px",
    },
    error: {
      color: "red",
      textAlign: "center",
      marginBottom: "20px",
      padding: "10px",
      backgroundColor: "#ffebee",
      borderRadius: "4px",
    },
    loading: {
      textAlign: "center",
      padding: "20px",
      fontSize: "18px",
      color: "#666",
    },
  };

  if (loading) return <div style={styles.loading}>Loading home details...</div>;
  if (error) return (
    <div style={styles.container}>
      <div style={styles.error}>
        {error}
        <button 
          onClick={() => navigate("/danation-view")}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
  if (!home) return (
    <div style={styles.container}>
      <div style={styles.error}>
        Home not found
        <button 
          onClick={() => navigate("/danation-view")}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Make a Donation</h2>

      {/* Home Details Section */}
      <div style={styles.homeDetails}>
        <h3>Home Details</h3>
        <div style={styles.detailRow}>
          <span style={styles.label}>Home Name:</span>
          <span>{home.homeName}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.label}>Account Number:</span>
          <span>{home.accountNumber || "N/A"}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.label}>Capacity:</span>
          <span>{home.homeCapacity} residents</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.label}>Type:</span>
          <span>{home.homeType}</span>
        </div>
      </div>

      {/* Donation Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Donation Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            style={styles.input}
            required
            min="1"
          />
        </div>

        <div style={styles.formGroup}>
          <label>Your Name</label>
          <input
            type="text"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="donorEmail"
            value={formData.donorEmail}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Phone Number</label>
          <input
            type="tel"
            name="donorPhone"
            value={formData.donorPhone}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        {formData.paymentMethod !== "Bank Transfer" && (
          <>
            <div style={styles.formGroup}>
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                style={styles.input}
                required
                pattern="[0-9]{16}"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div style={styles.formGroup}>
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                style={styles.input}
                required
                pattern="[0-9]{2}/[0-9]{2}"
                placeholder="MM/YY"
              />
            </div>

            <div style={styles.formGroup}>
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                style={styles.input}
                required
                pattern="[0-9]{3,4}"
                placeholder="123"
              />
            </div>
          </>
        )}

        <button type="submit" style={styles.submitButton}>
          Complete Donation
        </button>
      </form>
    </div>
  );
};

export default AddDonation; 