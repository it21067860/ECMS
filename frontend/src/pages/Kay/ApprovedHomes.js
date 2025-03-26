import React, { useEffect, useState } from "react";
import { getHomes, deleteHome, updateHome } from "../../api/homeManageService";
import KaySidebar from "../../components/Kay/KaySidebar";

const ApprovedHomes = () => {
  const [pendingHomes, setPendingHomes] = useState([]); // Homes awaiting approval
  const [processedHomes, setProcessedHomes] = useState([]); // Approved or rejected homes
  const [selectedHome, setSelectedHome] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getHomes();
        console.log("Homes received:", data);
        const pending = data.filter((home) => !home.approved && !home.rejected); // Pending homes
        const processed = data.filter((home) => home.approved || home.rejected); // Approved or rejected
        setPendingHomes(pending);
        setProcessedHomes(processed);
      } catch (error) {
        console.error("Error fetching homes:", error);
        setError("Failed to load homes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHomes();
  }, []);

  const handleApprove = async (id) => {
    if (window.confirm("Are you sure you want to approve this ElderHome?")) {
      setLoading(true);
      setError(null);
      try {
        await updateHome(id, { approved: true, rejected: false });
        const homeToApprove = pendingHomes.find((home) => home._id === id);
        setPendingHomes(pendingHomes.filter((home) => home._id !== id));
        setProcessedHomes([...processedHomes, { ...homeToApprove, approved: true, rejected: false }]);
        console.log(`Home with ID ${id} approved successfully`);
      } catch (error) {
        console.error("Error approving home:", error);
        setError(error.message || "Failed to approve home. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to reject this ElderHome?")) {
      setLoading(true);
      setError(null);
      try {
        await updateHome(id, { rejected: true, approved: false });
        const homeToReject = pendingHomes.find((home) => home._id === id);
        setPendingHomes(pendingHomes.filter((home) => home._id !== id));
        setProcessedHomes([...processedHomes, { ...homeToReject, rejected: true, approved: false }]);
        console.log(`Home with ID ${id} rejected successfully`);
      } catch (error) {
        console.error("Error rejecting home:", error);
        setError(error.message || "Failed to reject home. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      // Ensure approved remains true for homes in the processed table when updating
      const updatedData = { ...updates, approved: true, rejected: false };
      const response = await updateHome(id, updatedData);
      setProcessedHomes(
        processedHomes.map((home) =>
          home._id === id ? { ...home, ...updatedData } : home
        )
      );
      console.log(`Home with ID ${id} updated successfully`);
      setSelectedHome(null); // Close popup after update
    } catch (error) {
      console.error("Error updating home:", error);
      setError(error.message || "Failed to update home. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ElderHome from the database?")) {
      setLoading(true);
      setError(null);
      try {
        await deleteHome(id);
        setProcessedHomes(processedHomes.filter((home) => home._id !== id));
        console.log(`Home with ID ${id} deleted successfully`);
      } catch (error) {
        console.error("Error deleting home:", error);
        setError(error.message || "Failed to delete home. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = (home, updateMode = false) => {
    setSelectedHome({ ...home, updateMode });
    setError(null);
  };

  const closePopup = () => {
    setSelectedHome(null);
    setError(null);
  };

  return (
    <div style={{ display: "flex" }}>
      <KaySidebar />
      <div style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
        {/* Pending Homes Table */}
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Homes Awaiting Approval</h2>
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd", marginBottom: "40px" }}>
          <thead>
            <tr style={{ background: "#f4f4f4" }}>
              <th style={styles.th}>Home Name</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Capacity</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingHomes.length > 0 ? (
              pendingHomes.map((home) => (
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
                  <td style={styles.td}>
                    <button onClick={() => handleView(home)} style={styles.viewButton} disabled={loading}>
                      View
                    </button>
                    <button onClick={() => handleApprove(home._id)} style={styles.approveButton} disabled={loading}>
                      Approve
                    </button>
                    <button onClick={() => handleReject(home._id)} style={styles.rejectButton} disabled={loading}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                    No homes awaiting approval.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* Processed Homes Table */}
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Processed ElderHomes</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
          <thead>
            <tr style={{ background: "#f4f4f4" }}>
              <th style={styles.th}>Home Name</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Capacity</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {processedHomes.length > 0 ? (
              processedHomes.map((home) => (
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
                  <td style={styles.td}>{home.approved ? "Approved" : "Rejected"}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleView(home)} style={styles.viewButton} disabled={loading}>
                      View
                    </button>
                    {home.approved && (
                      <button
                        onClick={() => handleView(home, true)} // Pass true for update mode
                        style={styles.updateButton}
                        disabled={loading}
                      >
                        Update
                      </button>
                    )}
                    <button onClick={() => handleDelete(home._id)} style={styles.deleteButton} disabled={loading}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "10px" }}>
                    No processed ElderHomes found.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* Popup for Viewing or Updating Home Details */}
        {selectedHome && (
          <div style={styles.popupOverlay}>
            <div style={styles.popupContent}>
              <h3>{selectedHome.homeName}</h3>
              {selectedHome.approved && selectedHome.updateMode ? (
                // Update Form
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const updates = {
                      homeName: e.target.homeName.value,
                      homeAddress: e.target.homeAddress.value,
                      homeEmail: e.target.homeEmail.value,
                      homeCapacity: e.target.homeCapacity.value,
                      homeType: e.target.homeType.value,
                      // Add other fields as needed
                    };
                    handleUpdate(selectedHome._id, updates);
                  }}
                >
                  <p>
                    <strong>Name:</strong>{" "}
                    <input name="homeName" defaultValue={selectedHome.homeName} style={styles.input} />
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    <input name="homeAddress" defaultValue={selectedHome.homeAddress} style={styles.input} />
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <input name="homeEmail" defaultValue={selectedHome.homeEmail} style={styles.input} />
                  </p>
                  <p>
                    <strong>Capacity:</strong>{" "}
                    <input name="homeCapacity" defaultValue={selectedHome.homeCapacity} style={styles.input} />
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    <input name="homeType" defaultValue={selectedHome.homeType} style={styles.input} />
                  </p>
                  {/* Add more editable fields as needed */}
                  <div style={{ marginTop: "20px" }}>
                    <button type="submit" style={styles.saveButton} disabled={loading}>
                      Save
                    </button>
                    <button onClick={closePopup} style={styles.closeButton} disabled={loading}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // View Mode
                <>
                  <p><strong>Address:</strong> {selectedHome.homeAddress}</p>
                  <p>
                    <strong>Contact:</strong>{" "}
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
                  <p><strong>Account Number:</strong> {selectedHome.accountNumber || "N/A"}</p>
                  {selectedHome.homeImage1 && (
                    <img src={selectedHome.homeImage1} alt="Home 1" style={styles.image} />
                  )}
                  {selectedHome.homeImage2 && (
                    <img src={selectedHome.homeImage2} alt="Home 2" style={styles.image} />
                  )}
                  {selectedHome.homeOwnerImage && (
                    <img src={selectedHome.homeOwnerImage} alt="Owner" style={styles.image} />
                  )}
                  <p><strong>Approval Status:</strong> {selectedHome.approved ? "Yes" : selectedHome.rejected ? "Rejected" : "Pending"}</p>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <div style={{ marginTop: "20px" }}>
                    <button onClick={closePopup} style={styles.closeButton} disabled={loading}>
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
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
  },
  approveButton: {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "5px",
  },
  rejectButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "5px",
  },
  updateButton: {
    padding: "5px 10px",
    backgroundColor: "#ffc107",
    color: "black",
    border: "none",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
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
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  input: {
    padding: "5px",
    width: "100%",
    maxWidth: "300px",
  },
  image: {
    maxWidth: "200px",
    margin: "10px 0",
    borderRadius: "5px",
  },
};

export default ApprovedHomes;