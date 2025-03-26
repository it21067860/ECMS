import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8079/api",
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
  });
  


export const createDonation = async (donationData) => {
    try {
      console.log("Creating donation:", donationData);
      const response = await apiClient.post("/donations/create", donationData);
      console.log("Donation created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in createDonation:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        throw new Error(error.response.data.error || "Failed to create donation");
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response from server. Please check your connection.");
      } else {
        console.error("Error setting up request:", error.message);
        throw new Error("Error setting up request");
      }
    }
  };
  export const getAllDonations = async () => {
    try {
      console.log("Fetching all donations");
      const response = await apiClient.get("/formData/all");
      console.log("Donations received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in getAllDonations:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        throw new Error(error.response.data.error || "Failed to fetch donations");
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response from server. Please check your connection.");
      } else {
        console.error("Error setting up request:", error.message);
        throw new Error("Error setting up request");
      }
    }
  };
  
  export const approveDonation = async (id) => {
    try {
      console.log("Approving donation:", id);
      const response = await apiClient.patch(`/formData/approve/${id}`);
      console.log("Donation approved:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in approveDonation:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        throw new Error(error.response.data.error || "Failed to approve donation");
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response from server. Please check your connection.");
      } else {
        console.error("Error setting up request:", error.message);
        throw new Error("Error setting up request");
      }
    }
  };
  
  export const rejectDonation = async (id, reason) => {
    try {
      console.log("Rejecting donation:", id);
      const response = await apiClient.patch(`/formData/reject/${id}`, { rejectionReason: reason });
      console.log("Donation rejected:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in rejectDonation:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        throw new Error(error.response.data.error || "Failed to reject donation");
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response from server. Please check your connection.");
      } else {
        console.error("Error setting up request:", error.message);
        throw new Error("Error setting up request");
      }
    }
  };
  
  