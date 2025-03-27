import React, { useState } from "react";
import { addPatient } from "../api/patientService";

const RegisterPatient = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    contactNumber: "",
    address: "",
    medicalHistory: "",
    emergencyContact: { name: "", phone: "" }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, [field]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPatient(formData);
      alert("Patient registered successfully!");
      setFormData({
        fullName: "",
        age: "",
        gender: "",
        contactNumber: "",
        address: "",
        medicalHistory: "",
        emergencyContact: { name: "", phone: "" }
      });
    } catch (err) {
      alert("Error registering patient");
      console.error(err);
    }
  };

  return (
    <div style={{ 
      maxWidth: "600px", 
      margin: "2rem auto", 
      padding: "2rem", 
      backgroundColor: "#fff", 
      borderRadius: "8px", 
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h2 style={{ 
        color: "#2c3e50", 
        textAlign: "center", 
        marginBottom: "1.5rem",
        fontWeight: "600"
      }}>
        Register Patient
      </h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input 
          style={inputStyle}
          type="text" 
          name="fullName" 
          placeholder="Full Name" 
          value={formData.fullName} 
          onChange={handleChange} 
          required 
        />
        <input 
          style={inputStyle}
          type="number" 
          name="age" 
          placeholder="Age" 
          value={formData.age} 
          onChange={handleChange} 
          required 
        />
        <select 
          style={{ ...inputStyle, color: formData.gender ? "#333" : "#999" }}
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input 
          style={inputStyle}
          type="text" 
          name="contactNumber" 
          placeholder="Contact Number" 
          value={formData.contactNumber} 
          onChange={handleChange} 
          required 
        />
        <input 
          style={inputStyle}
          type="text" 
          name="address" 
          placeholder="Address" 
          value={formData.address} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          name="medicalHistory" 
          placeholder="Medical History" 
          value={formData.medicalHistory} 
          onChange={handleChange} 
          required 
        />
        <h4 style={{ 
          margin: "0.5rem 0 0 0", 
          color: "#2c3e50",
          fontWeight: "500"
        }}>
          Emergency Contact
        </h4>
        <input 
          style={inputStyle}
          type="text" 
          name="emergencyContact.name" 
          placeholder="Name" 
          value={formData.emergencyContact.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          style={inputStyle}
          type="text" 
          name="emergencyContact.phone" 
          placeholder="Phone" 
          value={formData.emergencyContact.phone} 
          onChange={handleChange} 
          required 
        />
        <button 
          type="submit"
          style={{
            padding: "0.8rem",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.2s",
            marginTop: "0.5rem",
            ":hover": {
              backgroundColor: "#2980b9"
            }
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "0.8rem",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "1rem",
  transition: "border-color 0.2s",
  ":focus": {
    outline: "none",
    borderColor: "#3498db",
    boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)"
  }
};

export default RegisterPatient;