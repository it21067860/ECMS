// src/api.js
import axios from "axios";

// Create an Axios instance with the base URL
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Fetch all homes
const fetchHomes = async () => {
  try {
    const response = await API.get("/homes");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch homes");
  }
};

// Fetch a single home by ID
const fetchHomeById = async (id) => {
  try {
    const response = await API.get(`/homes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch home");
  }
};

// Create a new donation
const createDonation = async (data) => {
  try {
    const response = await API.post("/donate", data, {
      headers: { Authorization: "Bearer YOUR_TOKEN" }, // Replace with real token logic
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create donation");
  }
};

// Fetch all donations (admin)
const getAllDonations = async () => {
  try {
    const response = await API.get("/admin/donations");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch donations");
  }
};

// Accept a donation (admin)
const acceptDonation = async (id) => {
  try {
    const response = await API.put(`/admin/donations/${id}/accept`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to accept donation");
  }
};

// Reject a donation (admin)
const rejectDonation = async (id) => {
  try {
    const response = await API.put(`/admin/donations/${id}/reject`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to reject donation");
  }
};

export {
  fetchHomes,
  fetchHomeById,
  createDonation,
  getAllDonations,
  acceptDonation,
  rejectDonation,
};