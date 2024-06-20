import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestOverview.css';
import { getRequestOverview } from '../services/leaveService';
import useFetch from '../hooks/useFetch';

const RequestOverview = () => {
  const { data: requests, loading, error } = useFetch(getRequestOverview);
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading request overview</div>;

  const handleAddClick = () => {
    navigate('/leave-request');
  };

  return (
    <div className="request-overview">
      <div className="heading">
        <h2>Request Overview</h2>
        <button className="add-button" onClick={handleAddClick}>Add</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Approver</th>
              <th>Days</th>
              <th>Quota Used</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request, index) => (
                <tr key={index}>
                  <td>{request.leaveType}</td>
                  <td>{request.date}</td>
                  <td>{request.status}</td>
                  <td>{request.approver}</td>
                  <td>{request.days}</td>
                  <td>{request.quotaUsed}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestOverview;
