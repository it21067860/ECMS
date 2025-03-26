import React, { useState } from "react";
import axios from "axios";
import "./VolunteerRegister.css";

export default function VolunteerRegister() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    nicNumber: "",
    phone: "",
    address: "",
    availability: "",
    category: "",
    teachingSubjects: "",
    medicalServices: "",
    otherService: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8079/api/volunteers/register", formData)
      .then(() => {
        alert("Volunteer Registered Successfully!");
        setFormData({
          fullName: "",
          email: "",
          nicNumber: "",
          phone: "",
          address: "",
          availability: "",
          category: "",
          teachingSubjects: "",
          medicalServices: "",
          otherService: "",
          acceptTerms: false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Registration Failed");
      });
  };

  return (
    <div className="volunteer-register-container">
      <h2>Volunteer Registration</h2>
      <form onSubmit={handleSubmit} className="volunteer-form">
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="nicNumber" placeholder="NIC Number" value={formData.nicNumber} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="availability" placeholder="Availability (Days/Hours)" value={formData.availability} onChange={handleChange} required />

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Teaching">Teaching</option>
          <option value="Medical services">Medical services</option>
          <option value="Other">Other</option>
        </select>

        {formData.category === "Teaching" && (
          <input type="text" name="teachingSubjects" placeholder="Teaching Subjects" value={formData.teachingSubjects} onChange={handleChange} required />
        )}
        {formData.category === "Medical services" && (
          <input type="text" name="medicalServices" placeholder="Medical Services" value={formData.medicalServices} onChange={handleChange} required />
        )}
        {formData.category === "Other" && (
          <input type="text" name="otherService" placeholder="Other Service" value={formData.otherService} onChange={handleChange} required />
        )}

        <label>
          <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} required /> I accept the terms and conditions
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
