import React, { useEffect, useState } from "react";
import { getAllDonations, approveDonation, rejectDonation } from "../../api/donationServis";
import KaySidebar from "../../components/Kay/KaySidebar";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const data = await getAllDonations();
      setDonations(data);
    } catch (err) {
      console.error("Error fetching donations:", err);
      setError("Failed to load donations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveDonation(id);
      fetchDonations(); // Refresh the list
    } catch (err) {
      console.error("Error approving donation:", err);
      alert("Failed to approve donation. Please try again.");
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Please enter rejection reason:");
    if (reason) {
      try {
        await rejectDonation(id, reason);
        fetchDonations(); // Refresh the list
      } catch (err) {
        console.error("Error rejecting donation:", err);
        alert("Failed to reject donation. Please try again.");
      }
    }
  };

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
    },
    content: {
      flex: 1,
      padding: "20px",
      backgroundColor: "#f5f5f5",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      marginTop: "20px",
    },
    th: {
      padding: "12px",
      textAlign: "left",
      backgroundColor: "#f4f4f4",
      borderBottom: "2px solid #ddd",
      fontWeight: "bold",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
    },
    tr: {
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    status: {
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "14px",
    },
    statusPending: {
      backgroundColor: "#fff3cd",
      color: "#856404",
    },
    statusApproved: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    statusRejected: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    button: {
      padding: "6px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "8px",
    },
    approveButton: {
      backgroundColor: "#28a745",
      color: "white",
    },
    rejectButton: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    loading: {
      textAlign: "center",
      padding: "20px",
      fontSize: "18px",
      color: "#666",
    },
    error: {
      color: "red",
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#ffebee",
      borderRadius: "4px",
      margin: "20px 0",
    },
  };

  return (
    <div style={styles.container}>
      <KaySidebar />
      <div style={styles.content}>
        <h2 style={styles.title}>Donation Management</h2>
        
        {loading && <div style={styles.loading}>Loading donations...</div>}
        {error && <div style={styles.error}>{error}</div>}

        {!loading && !error && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Donor Name</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Home</th>
                <th style={styles.th}>Payment Method</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id} style={styles.tr}>
                  <td style={styles.td}>{donation.donorName}</td>
                  <td style={styles.td}>${donation.amount}</td>
                  <td style={styles.td}>{donation.homeId?.homeName || "N/A"}</td>
                  <td style={styles.td}>{donation.paymentMethod}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        ...(donation.status === "pending"
                          ? styles.statusPending
                          : donation.status === "approved"
                          ? styles.statusApproved
                          : styles.statusRejected),
                      }}
                    >
                      {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    {donation.status === "pending" && (
                      <>
                        <button
                          style={{ ...styles.button, ...styles.approveButton }}
                          onClick={() => handleApprove(donation._id)}
                        >
                          Approve
                        </button>
                        <button
                          style={{ ...styles.button, ...styles.rejectButton }}
                          onClick={() => handleReject(donation._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {donation.status === "rejected" && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        Reason: {donation.rejectionReason}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDonations; 