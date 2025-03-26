import React, { useEffect, useState } from "react";
import axios from "axios";
import KaySidebar from "../../components/Kay/KaySidebar";
import KayCaregiverCard from "../../components/Kay/KayCaregiverCard";
//import "../../pages/Styles/Kayadmin.css";

const KayAdminDashboard = () => {
  const [pendingCaregivers, setPendingCaregivers] = useState([]);
  const [approvedCaregivers, setApprovedCaregivers] = useState([]);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const pendingRes = await axios.get("http://localhost:8079/api/admin/pending-caregivers");
        const approvedRes = await axios.get("http://localhost:8079/api/caregivers/approved");
        setPendingCaregivers(pendingRes.data);
        setApprovedCaregivers(approvedRes.data);
      } catch (err) {
        console.error("Error fetching caregivers:", err);
      }
    };
    fetchCaregivers();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8079/api/admin/approve-caregiver/${id}`, {
        username: `caregiver${id.slice(0, 4)}`, // Auto-generate username
        password: "defaultPassword123", // Admin sets a default password
      });
      alert("Caregiver approved!");
      window.location.reload();
    } catch (err) {
      alert("Failed to approve caregiver.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this caregiver request?")) {
      try {
        await axios.delete(`http://localhost:8079/api/admin/delete-caregiver/${id}`);
        alert("Deleted successfully!");
        window.location.reload();
      } catch (err) {
        alert("Failed to delete.");
      }
    }
  };

  return (
    <div className="kay-admin-dashboard">
      <KaySidebar />
      <div className="kay-content">
        <h1>Admin Dashboard</h1>
        
        <section>
          <h2>Pending Caregivers ({pendingCaregivers.length})</h2>
          {pendingCaregivers.map((caregiver) => (
            <KayCaregiverCard
              key={caregiver._id}
              caregiver={caregiver}
              onApprove={() => handleApprove(caregiver._id)}
              onDelete={() => handleDelete(caregiver._id)}
            />
          ))}
        </section>

        <section>
          <h2>Approved Caregivers ({approvedCaregivers.length})</h2>
          {approvedCaregivers.map((caregiver) => (
            <KayCaregiverCard key={caregiver._id} caregiver={caregiver} />
          ))}
        </section>

        <section>
          <h2>Approved Homes ({approvedCaregivers.length})</h2>
          {approvedCaregivers.map((caregiver) => (
            <KayCaregiverCard key={caregiver._id} caregiver={caregiver} />
          ))}

        </section>
      </div>
    </div>
  );
};

export default KayAdminDashboard;

