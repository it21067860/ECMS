//Card for displaying caregiver info

import React from 'react';
import { Link } from 'react-router-dom';
import '../../pages/css/Home.css';

const KayCaregiverCard = ({ caregiver, showActions, onApprove, onDelete }) => {
  return (
    <div className="kay-caregiver-card">
      <div className="kay-caregiver-header">
        <h3>{caregiver.fullName}</h3>
        <span className={`kay-status-badge ${caregiver.isApproved ? 'approved' : 'pending'}`}>
          {caregiver.isApproved ? 'Approved' : 'Pending'}
        </span>
      </div>
      
      <div className="kay-caregiver-details">
        <p><strong>Email:</strong> {caregiver.email}</p>
        <p><strong>Phone:</strong> {caregiver.phone}</p>
        <p><strong>NIC:</strong> {caregiver.nicNumber}</p>
        <p><strong>Experience:</strong> {caregiver.experienceYears} years</p>
        <p><strong>Skills:</strong> {caregiver.medicalSkills.join(', ')}</p>
      </div>

      {showActions && (
        <div className="kay-caregiver-actions">
          {!caregiver.isApproved && (
            <button 
              className="kay-btn kay-btn-success"
              onClick={() => onApprove(caregiver._id)}
            >
              Approve
            </button>
          )}
          <button 
            className="kay-btn kay-btn-danger"
            onClick={() => onDelete(caregiver._id)}
          >
            Delete
          </button>
          <Link 
            to={`/caregiver/${caregiver._id}`}
            className="kay-btn kay-btn-info"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default KayCaregiverCard;