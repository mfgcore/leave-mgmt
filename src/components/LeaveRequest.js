import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LeaveRequest.css';
import { getLeaveTypes, postLeaveRequest } from '../services/leaveService';
import useFetch from '../hooks/useFetch';

const LeaveRequest = () => {
  const [leaveType, setLeaveType] = useState('2000');
  const [duration, setDuration] = useState('moreThanOneDay');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reason, setReason] = useState('');
  const [approver, setApprover] = useState('Supervisor');
  const [note, setNote] = useState('');
  const [inputHours, setInputHours] = useState('');
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const { data: leaveBalances, loading, error } = useFetch(getLeaveTypes);
  const [selectedLeaveBalance, setSelectedLeaveBalance] = useState('');

  useEffect(() => {
    calculateInputHours();
  }, [startDate, endDate, startTime, endTime, duration]);

  useEffect(() => {
    if (leaveType === '2000' && leaveBalances) {
      setSelectedLeaveBalance(leaveBalances[leaveType].balance);
    } else {
      setSelectedLeaveBalance(null);
    }
  }, [leaveType, leaveBalances]);

  const handleDurationChange = (e) => {
    const selectedDuration = e.target.value;
    setDuration(selectedDuration);

    if (selectedDuration === 'oneDayOrLess') {
      setEndDate(startDate);
    }
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    if (duration === 'oneDayOrLess') {
      setEndDate(newStartDate);
    }
  };

  const calculateInputHours = () => {
    if (duration === 'moreThanOneDay') {
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffInTime = end - start;
        const diffInDays = diffInTime / (1000 * 3600 * 24) + 1;
        setInputHours(`${diffInDays * 8} hours`);
      } else {
        setInputHours('');
      }
    } else {
      if (startDate && startTime && endTime) {
        const start = new Date(`${startDate}T${startTime}`);
        const end = new Date(`${startDate}T${endTime}`);
        const diffInTime = end - start;
        const diffInHours = diffInTime / (1000 * 3600);
        setInputHours(`${diffInHours} hours`);
      } else {
        setInputHours('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) {
      alert('Please fill in all required fields.');
      return;
    }

    const data = { startDate, endDate, reason, leaveType, duration, startTime, endTime, note };
    console.log('Submitting leave request:', data);
    postLeaveRequest(data)
      .then((response) => {
        alert(response.data.message);
        navigate('/leave-balance');
      })
      .catch((error) => console.error('Error submitting leave request:', error));
  };

  const handleCancel = () => {
    navigate('/leave-balance');
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading leave types</div>;

  return (
    <div className="leave-request">
      <h2>Create Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="section">
          <h3>Leave Type Selection</h3>
          <div className="form-group">
            <label>
              Leave Type:
              <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                <option value="2000">Annual Leave</option>
                <option value="2001">Pers. Lv with Cert</option>
                <option value="2002">Pers. Lv w/o Cert</option>
                <option value="2044">Pers. Lv Call In w/o Cert</option>
                <option value="20C1">Carers Lv with Cert</option>
                <option value="20C2">Carers Lv w/o Cert</option>
              </select>
            </label>
            {leaveType === '2000' && (
              <p>{selectedLeaveBalance} available</p>
            )}
          </div>
        </div>

        <div className="section">
          <h3>General Data</h3>
          <div className="form-group">
            <div className="radio-group">
              <label className="radio">
                <input
                  type="radio"
                  name="duration"
                  value="moreThanOneDay"
                  checked={duration === 'moreThanOneDay'}
                  onChange={handleDurationChange}
                />
                <span>More than 1 day</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="duration"
                  value="oneDayOrLess"
                  checked={duration === 'oneDayOrLess'}
                  onChange={handleDurationChange}
                />
                <span>One day or less</span>
              </label>
            </div>
            <label>
              Date:
              <input type="date" value={startDate} onChange={handleStartDateChange} required />
            </label>
            {duration === 'moreThanOneDay' && (
              <label>
                End Date:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
              </label>
            )}
            {duration === 'oneDayOrLess' && (
              <>
                <label>
                  Start Time:
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </label>
                <label>
                  End Time:
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </label>
              </>
            )}
            <label>
              Reason:
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
            </label>
            <label>
              Input Hours:
              <input type="text" value={inputHours} readOnly />
            </label>
            <label>
              Approver:
              <input type="text" value={approver} readOnly />
            </label>
            <label>
              New Note:
              <textarea value={note} onChange={(e) => setNote(e.target.value)} />
            </label>
          </div>
        </div>

        <div className="section upload-section">
          <h3>Attachments ({files.length})</h3>
          <div className="form-group">
            <input type="file" multiple onChange={handleFileChange} />
            <div className="file-list">
              {Array.from(files).map((file, index) => (
                <p key={index}>{file.name}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequest;
