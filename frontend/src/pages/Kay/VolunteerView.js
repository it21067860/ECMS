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
    <div>
      <h2>Volunteer List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Full Name</th><th>Email</th><th>NIC</th><th>Phone</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((v) => (
            <tr key={v._id}>
              <td>
                {editVolunteer === v._id ? (
                  <input name="fullName" value={updatedData.fullName} onChange={handleUpdateChange} />
                ) : (v.fullName)}
              </td>
              <td>
                {editVolunteer === v._id ? (
                  <input name="email" value={updatedData.email} onChange={handleUpdateChange} />
                ) : (v.email)}
              </td>
              <td>{v.nicNumber}</td>
              <td>
                {editVolunteer === v._id ? (
                  <input name="phone" value={updatedData.phone} onChange={handleUpdateChange} />
                ) : (v.phone)}
              </td>
              <td>{v.category}</td>
              <td>
                {editVolunteer === v._id ? (
                  <>
                    <button onClick={() => handleUpdateSubmit(v._id)}>Save</button>
                    <button onClick={() => setEditVolunteer(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(v)}>Edit</button>
                    <button onClick={() => handleDelete(v._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
