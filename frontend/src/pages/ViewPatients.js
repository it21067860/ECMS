import React, { useEffect, useState } from "react";
import { getPatients, deletePatient } from "../api/patientService";

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);

  // Fetch patients from backend
  useEffect(() => {
    getPatients()
      .then((data) => {
        console.log("Patients received:", data); // Debugging
        setPatients(data);
      })
      .catch((error) => console.error("Error fetching patient data:", error));
  }, []);
  
  // Delete a patient
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await deletePatient(id);
        setPatients(patients.filter((patient) => patient._id !== id));
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Patient List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th style={styles.th}>Full Name</th>
            <th style={styles.th}>Age</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>Contact</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient._id} style={styles.tr}>
                <td style={styles.td}>{patient.fullName}</td>
                <td style={styles.td}>{patient.age}</td>
                <td style={styles.td}>{patient.gender}</td>
                <td style={styles.td}>{patient.contactNumber}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDelete(patient._id)}
                    style={{ padding: "5px 10px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// CSS Styles as JS Objects
const styles = {
  th: { padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" },
  td: { padding: "10px", borderBottom: "1px solid #ddd" },
  tr: { background: "#fff" },
};

export default ViewPatients;
