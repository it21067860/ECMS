/*import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8079/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const handleError = (error) => {
  if (error.response) throw new Error(error.response.data.message || "Request failed");
  if (error.request) throw new Error("No response from server.");
  throw new Error(error.message);
};

export const getHomes = async () => {
  try {
    const response = await apiClient.get("/homesReg");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteHome = async (id) => {
  try {
    const response = await apiClient.delete(`/homesReg/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateHome = async (id, updates) => {
  try {
    const response = await apiClient.put(`/homesReg/${id}`, updates);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const addHome = async (homeData) => {
  try {
    const response = await apiClient.post("/homesReg", homeData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};*/

import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8079/api",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

const handleError = (error) => {
  if (error.response) {
    console.error("Server error:", error.response.status, error.response.data);
    throw new Error(error.response.data.message || "Request failed");
  } else if (error.request) {
    console.error("No response from server. Config:", error.config);
    throw new Error("No response from server. Check if backend is running.");
  } else {
    console.error("Request setup error:", error.message);
    throw new Error(error.message);
  }
};

export const getHomes = async () => {
  try {
    const response = await apiClient.get("/homesReg");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteHome = async (id) => {
  console.log("Sending DELETE to:", `/homesReg/${id}`);
  try {
    const response = await apiClient.delete(`/homesReg/${id}`);
    console.log("Delete response:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateHome = async (id, updates) => {
  try {
    const response = await apiClient.put(`/homesReg/${id}`, updates);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addHome = async (homeData) => {
  try {
    const response = await apiClient.post("/homesReg", homeData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getHomeById = async (id) => {
  try {
    console.log("Fetching home with ID:", id);
    const response = await apiClient.get(`/homesReg/${id}`);
    console.log("Home data received:", response.data);
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response.data;
  } catch (error) {
    console.error("Error in getHomeById:", error);
    if (error.response) {
      console.error("Server response:", error.response.data);
      throw new Error(error.response.data.message || "Failed to fetch home details");
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response from server. Please check your connection.");
    } else {
      console.error("Error setting up request:", error.message);
      throw new Error("Error setting up request");
    }
  }
};



