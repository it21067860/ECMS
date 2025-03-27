import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHomeById } from "../api/homeManageService";
import { createDonation } from "../api/donationServis";

const AddDonation = () => {
  const { id } = useParams();
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
    cardName: "" // Added cardName
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchHomeDetails = async () => {
      if (!id) {
        setError("No home ID provided");
        setLoading(false);
        return;
      }
      try {
        const data = await getHomeById(id);
        if (!data) throw new Error("No data received from server");
        setHome(data);
      } catch (err) {
        setError(err.message || "Failed to load home details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHomeDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Input restrictions
    if (name === "donorPhone" || name === "cardNumber" || name === "cvv") {
      if (!/^\d*$/.test(value)) return; // Only numbers
    }
    if (name === "cardName") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return; // Only letters and spaces
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...formErrors };
    const currentDate = new Date();
    
    switch (name) {
      case "donorPhone":
        if (value && !/^\d{10}$/.test(value)) {
          newErrors.donorPhone = "Phone number must be exactly 10 digits";
        } else {
          delete newErrors.donorPhone;
        }
        break;
      case "cardNumber":
        if (value && !/^\d{16}$/.test(value)) {
          newErrors.cardNumber = "Card number must be exactly 16 digits";
        } else {
          delete newErrors.cardNumber;
        }
        break;
      case "cvv":
        if (value && !/^\d{3}$/.test(value)) {
          newErrors.cvv = "CVV must be exactly 3 digits";
        } else {
          delete newErrors.cvv;
        }
        break;
      case "cardName":
        if (!value) {
          newErrors.cardName = "Card name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.cardName = "Card name must contain only letters";
        } else {
          delete newErrors.cardName;
        }
        break;
      case "expiryDate":
        if (value) {
          const [month, year] = value.split('-');
          const expiry = new Date(`20${year}`, month - 1);
          if (isNaN(expiry.getTime()) || expiry <= currentDate) {
            newErrors.expiryDate = "Expiry date must be in the future";
          } else {
            delete newErrors.expiryDate;
          }
        }
        break;
      default:
        break;
    }
    setFormErrors(newErrors);
  };

  const validateForm = () => {
    const errors = {};
    const currentDate = new Date();

    if (!/^\d{10}$/.test(formData.donorPhone)) {
      errors.donorPhone = "Phone number must be exactly 10 digits";
    }
    
    if (formData.paymentMethod !== "Bank Transfer") {
      if (!/^\d{16}$/.test(formData.cardNumber)) {
        errors.cardNumber = "Card number must be exactly 16 digits";
      }
      if (!/^\d{3}$/.test(formData.cvv)) {
        errors.cvv = "CVV must be exactly 3 digits";
      }
      if (!formData.cardName || !/^[a-zA-Z\s]+$/.test(formData.cardName)) {
        errors.cardName = "Card name must contain only letters";
      }
      if (formData.expiryDate) {
        const [month, year] = formData.expiryDate.split('-');
        const expiry = new Date(`20${year}`, month - 1);
        if (isNaN(expiry.getTime()) || expiry <= currentDate) {
          errors.expiryDate = "Expiry date must be in the future";
        }
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("Please correct the form errors before submitting");
      return;
    }

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
          cvv: formData.cvv,
          cardName: formData.cardName
        } : {}
      };

      await createDonation(donationPayload);
      alert("Donation submitted successfully! Waiting for admin approval.");
      navigate("/danation-view");
    } catch (err) {
      setError(err.message || "Failed to submit donation. Please try again.");
    }
  };

  const styles = {
    container: { maxWidth: "800px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" },
    header: { textAlign: "center", marginBottom: "30px", color: "#333" },
    homeDetails: { backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "30px" },
    detailRow: { display: "flex", justifyContent: "space-between", marginBottom: "10px", padding: "10px", backgroundColor: "white", borderRadius: "4px" },
    label: { fontWeight: "bold", color: "#666" },
    form: { display: "flex", flexDirection: "column", gap: "15px" },
    formGroup: { display: "flex", flexDirection: "column", gap: "5px" },
    input: { padding: "10px", borderRadius: "4px", border: "1px solid #ddd", fontSize: "16px" },
    submitButton: { backgroundColor: "#4CAF50", color: "white", padding: "12px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", marginTop: "20px" },
    error: { color: "red", textAlign: "center", marginBottom: "20px", padding: "10px", backgroundColor: "#ffebee", borderRadius: "4px" },
    fieldError: { color: "red", fontSize: "12px", marginTop: "2px" },
    loading: { textAlign: "center", padding: "20px", fontSize: "18px", color: "#666" },
  };

  if (loading) return <div style={styles.loading}>Loading home details...</div>;
  if (error && !Object.keys(formErrors).length) return (
    <div style={styles.container}>
      <div style={styles.error}>
        {error}
        <button onClick={() => navigate("/danation-view")} style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Go Back
        </button>
      </div>
    </div>
  );
  if (!home) return (
    <div style={styles.container}>
      <div style={styles.error}>
        Home not found
        <button onClick={() => navigate("/danation-view")} style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Make a Donation</h2>
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.homeDetails}>
        <h3>Home Details</h3>
        <div style={styles.detailRow}><span style={styles.label}>Home Name:</span><span>{home.homeName}</span></div>
        <div style={styles.detailRow}><span style={styles.label}>Account Number:</span><span>{home.accountNumber || "N/A"}</span></div>
        <div style={styles.detailRow}><span style={styles.label}>Capacity:</span><span>{home.homeCapacity} residents</span></div>
        <div style={styles.detailRow}><span style={styles.label}>Type:</span><span>{home.homeType}</span></div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Donation Amount ($)</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} style={styles.input} required min="1" />
        </div>

        <div style={styles.formGroup}>
          <label>Your Name</label>
          <input type="text" name="donorName" value={formData.donorName} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.formGroup}>
          <label>Email</label>
          <input type="email" name="donorEmail" value={formData.donorEmail} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.formGroup}>
          <label>Phone Number</label>
          <input
            type="tel"
            name="donorPhone"
            value={formData.donorPhone}
            onChange={handleChange}
            style={{ ...styles.input, borderColor: formErrors.donorPhone ? "red" : "#ddd" }}
            required
            maxLength={10}
            placeholder="1234567890"
          />
          {formErrors.donorPhone && <span style={styles.fieldError}>{formErrors.donorPhone}</span>}
        </div>

        <div style={styles.formGroup}>
          <label>Payment Method</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} style={styles.input} required>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        {formData.paymentMethod !== "Bank Transfer" && (
          <>
            <div style={styles.formGroup}>
              <label>Card Name</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                style={{ ...styles.input, borderColor: formErrors.cardName ? "red" : "#ddd" }}
                required
                placeholder="John Doe"
              />
              {formErrors.cardName && <span style={styles.fieldError}>{formErrors.cardName}</span>}
            </div>

            <div style={styles.formGroup}>
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                style={{ ...styles.input, borderColor: formErrors.cardNumber ? "red" : "#ddd" }}
                required
                maxLength={16}
                placeholder="1234567890123456"
              />
              {formErrors.cardNumber && <span style={styles.fieldError}>{formErrors.cardNumber}</span>}
            </div>

            <div style={styles.formGroup}>
              <label>Expiry Date</label>
              <input
                type="month"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                style={{ ...styles.input, borderColor: formErrors.expiryDate ? "red" : "#ddd" }}
                required
                min={new Date().toISOString().slice(0, 7)} // Sets minimum to current month
              />
              {formErrors.expiryDate && <span style={styles.fieldError}>{formErrors.expiryDate}</span>}
            </div>

            <div style={styles.formGroup}>
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                style={{ ...styles.input, borderColor: formErrors.cvv ? "red" : "#ddd" }}
                required
                maxLength={3}
                placeholder="123"
              />
              {formErrors.cvv && <span style={styles.fieldError}>{formErrors.cvv}</span>}
            </div>
          </>
        )}

        <button type="submit" style={styles.submitButton}>Complete Donation</button>
      </form>
    </div>
  );
};

export default AddDonation;