import React, { useEffect, useState } from "react";
import { getHomes, deleteHome, updateHome } from "../api/homeManageService";

const ViewHomeManage = () => {
  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null); // For popup
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch homes from backend
  useEffect(() => {
    const fetchHomes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHomes();
        console.log("Homes received:", data);
        setHomes(data);
      } catch (error) {
        console.error("Error fetching homes:", error);
        setError("Failed to load homes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHomes();
  }, []);

  // Delete a home
  const handleDelete = async (id) => {
  
    if (window.confirm("Are you sure you want to delete this ElderHome?")) {
      setLoading(true);
      setError(null);
      try {
      
        await deleteHome(id);
        setHomes(homes.filter((home) => home._id !== id));
        console.log('Home with ID ${id} deleted successfully');

      } catch (error) {
        console.error("Error deleting home:", error);
        setError(error.message || "Failed to delete home. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Approve a home
  const handleApprove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const updatedHome = await updateHome(id, { approved: true });
      setHomes(homes.map((home) => (home._id === id ? updatedHome : home)));
      setSelectedHome(null); // Close popup after approval
    } catch (error) {
      console.error("Error approving home:", error);
      setError("Failed to approve home. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Open popup
  const handleView = (home) => {
    setSelectedHome(home);
    setError(null);
  };

  // Close popup
  const closePopup = () => {
    setSelectedHome(null);
    setError(null);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>ElderHomes List</h2>
      
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th style={styles.th}>Home Name</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}>Contact</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Capacity</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Approved</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {homes.length > 0 ? (
            homes.map((home) => (
              <tr key={home._id} style={styles.tr}>
                <td style={styles.td}>{home.homeName}</td>
                <td style={styles.td}>{home.homeAddress}</td>
                <td style={styles.td}>
                  {home.homeContact
                    ? `${JSON.parse(home.homeContact).name} (${JSON.parse(home.homeContact).phone})`
                    : "N/A"}
                </td>
                <td style={styles.td}>{home.homeEmail}</td>
                <td style={styles.td}>{home.homeCapacity}</td>
                <td style={styles.td}>{home.homeType}</td>
                <td style={styles.td}>{home.approved ? "Yes" : "No"}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleView(home)}
                    style={styles.viewButton}
                    disabled={loading}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(home._id)}
                    style={styles.deleteButton}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "10px" }}>
                  No ElderHomes found.
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Popup for Viewing Home Details */}
      {selectedHome && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h3>{selectedHome.homeName}</h3>
            <p><strong>Address:</strong> {selectedHome.homeAddress}</p>
            <p><strong>Contact:</strong> 
              {selectedHome.homeContact
                ? `${JSON.parse(selectedHome.homeContact).name} (${JSON.parse(selectedHome.homeContact).phone})`
                : "N/A"}
            </p>
            <p><strong>Email:</strong> {selectedHome.homeEmail}</p>
            <p><strong>Capacity:</strong> {selectedHome.homeCapacity}</p>
            <p><strong>Type:</strong> {selectedHome.homeType}</p>
            <p><strong>Status:</strong> {selectedHome.homeStatus}</p>
            <p><strong>Description:</strong> {selectedHome.homeDescription}</p>
            <p><strong>Location:</strong> {selectedHome.homeLocation}</p>
            <p><strong>Price:</strong> ${selectedHome.homePrice}</p>
            <p><strong>Rating:</strong> {selectedHome.homeRating}</p>
            <p><strong>Services:</strong> {selectedHome.homeServices}</p>
            <p><strong>Facilities:</strong> {selectedHome.homeFacilities}</p>
            <p><strong>Owner:</strong> {selectedHome.homeOwner}</p>
            <p><strong>Owner Contact:</strong> {selectedHome.homeOwnerContact}</p>
            <p><strong>Owner Email:</strong> {selectedHome.homeOwnerEmail}</p>
            {selectedHome.homeImage1 && (
              <img src={selectedHome.homeImage1} alt="Home 1" style={styles.image} />
            )}
            {selectedHome.homeImage2 && (
              <img src={selectedHome.homeImage2} alt="Home 2" style={styles.image} />
            )}
            {selectedHome.homeOwnerImage && (
              <img src={selectedHome.homeOwnerImage} alt="Owner" style={styles.image} />
            )}
            <p><strong>Approved:</strong> {selectedHome.approved ? "Yes" : "No"}</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ marginTop: "20px" }}>
              {!selectedHome.approved && (
                <button
                  onClick={() => handleApprove(selectedHome._id)}
                  style={styles.approveButton}
                  disabled={loading}
                >
                  {loading ? "Approving..." : "Approve"}
                </button>
              )}
              <button
                onClick={closePopup}
                style={styles.closeButton}
                disabled={loading}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// CSS Styles as JS Objects
const styles = {
  th: { padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" },
  td: { padding: "10px", borderBottom: "1px solid #ddd" },
  tr: { background: "#fff" },
  viewButton: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "5px",
    opacity: (props) => (props.disabled ? 0.5 : 1),
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    opacity: (props) => (props.disabled ? 0.5 : 1),
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  approveButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
    opacity: (props) => (props.disabled ? 0.5 : 1),
  },
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    cursor: "pointer",
    opacity: (props) => (props.disabled ? 0.5 : 1),
  },
  image: {
    maxWidth: "200px",
    margin: "10px 0",
    borderRadius: "5px",
  },
};

export default ViewHomeManage;