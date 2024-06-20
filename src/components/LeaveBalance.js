import React from 'react';
import './LeaveBalance.css';
import RequestOverview from './RequestOverview';
import { getLeaveBalance } from '../services/leaveService';
import useFetch from '../hooks/useFetch';

const LeaveBalance = () => {
  const { data: balanceData, loading, error } = useFetch(getLeaveBalance);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading leave balance</div>;

  return (
    <div className="leave-balance">
      <h2>Leave Management</h2>
      <h3>Entitlement</h3>
      <table>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Balance</th>
            <th>Future Leave</th>
            <th>Balance minus Future Leave</th>
          </tr>
        </thead>
        <tbody>
          {balanceData.length > 0 ? (
            balanceData.map((item, index) => (
              <tr key={index}>
                <td>{item.leaveType}</td>
                <td>{item.balance}</td>
                <td>{item.futureLeave}</td>
                <td>{item.balanceMinusFutureLeave}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">No data</td>
            </tr>
          )}
        </tbody>
      </table>
      <RequestOverview />
    </div>
  );
};

export default LeaveBalance;
