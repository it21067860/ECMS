import React, { useState } from "react";
import { addHome } from "../api/homeManageService";
import "./css/RegisterHome.css";

const RegisterHome = () => {
  const [formData, setFormData] = useState({
    homeName: "",
    homeAddress: "",
    homeContact: { name: "", phone: "" },
    homeEmail: "",
    homeCapacity: "",
    homeType: "",
    homeStatus: "Active",
    homeDescription: "",
    homeImage1: null,
    homeImage2: null,
    homeLocation: "",
    homePrice: "",
    homeRating: "",
    homeServices: "",
    homeFacilities: "",
    accountNumber: "",
    homeOwner: "",
    homeOwnerContact: "",
    homeOwnerEmail: "",
    homeOwnerImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("homeContact.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        homeContact: { ...formData.homeContact, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const homeImage1Base64 = formData.homeImage1 ? await fileToBase64(formData.homeImage1) : null;
      const homeImage2Base64 = formData.homeImage2 ? await fileToBase64(formData.homeImage2) : null;
      const homeOwnerImageBase64 = formData.homeOwnerImage ? await fileToBase64(formData.homeOwnerImage) : null;

      const dataToSend = {
        ...formData,
        homeContact: JSON.stringify(formData.homeContact),
        homeCapacity: Number(formData.homeCapacity),
        homePrice: Number(formData.homePrice),
        homeImage1: homeImage1Base64,
        homeImage2: homeImage2Base64,
        homeOwnerImage: homeOwnerImageBase64,
      };

      await addHome(dataToSend);
      alert("ElderHome registered successfully!");
      
      // Reset form
      setFormData({
        homeName: "",
        homeAddress: "",
        homeContact: { name: "", phone: "" },
        homeEmail: "",
        homeCapacity: "",
        homeType: "",
        homeStatus: "Active",
        homeDescription: "",
        homeImage1: null,
        homeImage2: null,
        homeLocation: "",
        homePrice: "",
        homeRating: "",
        homeServices: "",
        homeFacilities: "",
        homeOwner: "",
        homeOwnerContact: "",
        homeOwnerEmail: "",
        homeOwnerImage: null,
      });
    } catch (err) {
      alert("Error registering Home");
      console.error("API Error:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="register-home-container">
      <h2 className="register-home-title">Register Home</h2>
      
      <form onSubmit={handleSubmit} className="register-home-form">
        {/* Left Column */}
        <div>
          <div className="form-group">
            <label className="form-label">Home Name</label>
            <input
              type="text"
              name="homeName"
              value={formData.homeName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Home Address</label>
            <input
              type="text"
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contact Person</label>
            <input
              type="text"
              name="homeContact.name"
              value={formData.homeContact.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contact Phone</label>
            <input
              type="text"
              name="homeContact.phone"
              value={formData.homeContact.phone}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="homeEmail"
              value={formData.homeEmail}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Capacity</label>
            <input
              type="number"
              name="homeCapacity"
              value={formData.homeCapacity}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="form-group">
            <label className="form-label">Home Type</label>
            <select
              name="homeType"
              value={formData.homeType}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Home Type</option>
              <option value="ELDER_HOME">Elder Home</option>
              <option value="ORPHANAGE">Orphanage</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="homeStatus"
              value={formData.homeStatus}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="homeLocation"
              value={formData.homeLocation}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="homePrice"
              value={formData.homePrice}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Home Images</label>
            <div className="two-columns">
              <input
                type="file"
                name="homeImage1"
                onChange={(e) => setFormData({ ...formData, homeImage1: e.target.files[0] })}
                className="file-input"
              />
              <input
                type="file"
                name="homeImage2"
                onChange={(e) => setFormData({ ...formData, homeImage2: e.target.files[0] })}
                className="file-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Owner Image</label>
            <input
              type="file"
              name="homeOwnerImage"
              onChange={(e) => setFormData({ ...formData, homeOwnerImage: e.target.files[0] })}
              className="file-input"
            />
          </div>
        </div>

        {/* Full width fields */}
        <div className="form-group full-width">
          <label className="form-label">Description</label>
          <textarea
            name="homeDescription"
            value={formData.homeDescription}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </div>

        <div className="two-columns full-width">
          <div className="form-group">
            <label className="form-label">Owner Name</label>
            <input
              type="text"
              name="homeOwner"
              value={formData.homeOwner}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Owner Contact</label>
            <input
              type="text"
              name="homeOwnerContact"
              value={formData.homeOwnerContact}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label className="form-label">Owner Email</label>
          <input
            type="email"
            name="homeOwnerEmail"
            value={formData.homeOwnerEmail}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Account Number</label>
          <input
            type="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="two-columns full-width">
          <div className="form-group">
            <label className="form-label">Services</label>
            <input
              type="text"
              name="homeServices"
              value={formData.homeServices}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Facilities</label>
            <input
              type="text"
              name="homeFacilities"
              value={formData.homeFacilities}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="submit-button-container">
          <button
            type="submit"
            className="submit-button"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterHome;