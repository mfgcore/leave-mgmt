import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import './LeaveBalance.css';
import RequestOverview from './RequestOverview';
import { getLeaveBalance } from '../services/leaveService';

const LeaveBalance = () => {
  const { user, loading: userLoading } = useUser();
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.token) {
      console.log('Fetching leave balance with token:', user.token);
      const fetchLeaveBalance = async () => {
        try {
          const response = await getLeaveBalance(user.token);
          setLeaveBalance(response.data);
          console.log('Leave balance fetched:', response.data);
        } catch (error) {
          setError('Error fetching leave balance');
        } finally {
          setLoading(false);
        }
      };

      fetchLeaveBalance();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (userLoading || loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
          {leaveBalance && leaveBalance.length > 0 ? (
            leaveBalance.map((item, index) => (
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
