import React, { useEffect, useState } from "react";
import { getHomes } from "../api/homeManageService";
import { useNavigate } from "react-router-dom";

const DanationView = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleDonateClick = (home) => {
    navigate(`/add-donation/${home._id}`);
  };

  const styles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
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
    container: {
      maxWidth: "1200px",
      margin: "auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    donateButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: "#45a049",
      },
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ElderHomes List</h2>
      
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Home Name</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}>Contact</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Capacity</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Account Number</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
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
                <td style={styles.td}>{home.accountNumber || "N/A"}</td>
                <td style={styles.td}>{home.homeStatus}</td>
                <td style={styles.td}>
                  <button 
                    style={styles.donateButton}
                    onClick={() => handleDonateClick(home)}
                  >
                    Donate
                  </button>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "10px" }}>
                  No ElderHomes found.
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DanationView; 