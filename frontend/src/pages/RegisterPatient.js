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
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="medicalHistory" placeholder="Medical History" value={formData.medicalHistory} onChange={handleChange} required />
        <h4>Emergency Contact</h4>
        <input type="text" name="emergencyContact.name" placeholder="Name" value={formData.emergencyContact.name} onChange={handleChange} required />
        <input type="text" name="emergencyContact.phone" placeholder="Phone" value={formData.emergencyContact.phone} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPatient;
