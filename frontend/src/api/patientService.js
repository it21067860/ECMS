import axios from "axios";

const API_URL = "http://localhost:8079/api/patients/register"; // Backend API base URL

// Fetch all patients
export const getPatients = async () => {
  try {
    const response = await axios.get("http://localhost:8079/api/patients");
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

// Fetch a single patient by ID
export const getPatientById = async (id) => {
  try {
    const response = await axios.get(`${"http://localhost:8079/api/patients"}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  }
};

// Register a new patient
export const addPatient = async (patientData) => {
  try {
    const response = await axios.post(API_URL, patientData);
    return response.data;
  } catch (error) {
    console.error("Error adding patient:", error);
    throw error;
  }
};

// Update patient details
export const updatePatient = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
};

// Delete a patient
export const deletePatient = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
};
