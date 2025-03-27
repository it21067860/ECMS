import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VolunteerView() {
  const [volunteers, setVolunteers] = useState([]);
  const [editVolunteer, setEditVolunteer] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = () => {
    axios.get("http://localhost:8079/api/volunteers")
      .then((res) => setVolunteers(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this volunteer?")) {
      axios.delete(`http://localhost:8079/api/volunteers/${id}`)
        .then(() => fetchVolunteers())
        .catch((err) => console.error(err));
    }
  };

  const handleEditClick = (volunteer) => {
    setEditVolunteer(volunteer._id);
    setUpdatedData(volunteer);
  };

  const handleUpdateChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (id) => {
    axios.put(`http://localhost:8079/api/volunteers/${id}`, updatedData)
      .then(() => {
        setEditVolunteer(null);
        fetchVolunteers();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <h2 style={styles.header}>Volunteer Management</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>NIC</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((v) => (
              <tr key={v._id} style={styles.row}>
                <td style={styles.td}>
                  {editVolunteer === v._id ? (
                    <input 
                      name="fullName" 
                      value={updatedData.fullName} 
                      onChange={handleUpdateChange} 
                      style={styles.input}
                    />
                  ) : (v.fullName)}
                </td>
                <td style={styles.td}>
                  {editVolunteer === v._id ? (
                    <input 
                      name="email" 
                      value={updatedData.email} 
                      onChange={handleUpdateChange} 
                      style={styles.input}
                    />
                  ) : (v.email)}
                </td>
                <td style={styles.td}>{v.nicNumber}</td>
                <td style={styles.td}>
                  {editVolunteer === v._id ? (
                    <input 
                      name="phone" 
                      value={updatedData.phone} 
                      onChange={handleUpdateChange} 
                      style={styles.input}
                    />
                  ) : (v.phone)}
                </td>
                <td style={styles.td}>{v.category}</td>
                <td style={styles.td}>
                  {editVolunteer === v._id ? (
                    <div style={styles.actionGroup}>
                      <button 
                        onClick={() => handleUpdateSubmit(v._id)} 
                        style={styles.saveButton}
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setEditVolunteer(null)} 
                        style={styles.cancelButton}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div style={styles.actionGroup}>
                      <button 
                        onClick={() => handleEditClick(v)} 
                        style={styles.editButton}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(v._id)} 
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    animation: "fadeIn 0.5s ease-out"
  },
  header: {
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "1.8rem",
    fontWeight: "600",
    borderBottom: "2px solid #3498db",
    paddingBottom: "0.5rem",
    display: "inline-block"
  },
  tableContainer: {
    overflowX: "auto",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    borderRadius: "8px",
    backgroundColor: "#fff"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left"
  },
  headerRow: {
    backgroundColor: "#3498db",
    color: "white"
  },
  th: {
    padding: "1rem",
    fontWeight: "600",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  row: {
    borderBottom: "1px solid #e0e0e0",
    transition: "background-color 0.2s ease",
    ":hover": {
      backgroundColor: "#f8f9fa"
    }
  },
  td: {
    padding: "1rem",
    verticalAlign: "middle",
    fontSize: "0.95rem",
    color: "#495057"
  },
  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ced4da",
    width: "100%",
    boxSizing: "border-box",
    ":focus": {
      outline: "none",
      borderColor: "#3498db",
      boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)"
    }
  },
  actionGroup: {
    display: "flex",
    gap: "0.5rem"
  },
  editButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#ffc107",
    color: "#212529",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#e0a800",
      transform: "translateY(-1px)"
    }
  },
  deleteButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#c82333",
      transform: "translateY(-1px)"
    }
  },
  saveButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#218838",
      transform: "translateY(-1px)"
    }
  },
  cancelButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#5a6268",
      transform: "translateY(-1px)"
    }
  }
};