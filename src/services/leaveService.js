import axios from 'axios';
import API_BASE_URL from '../api';

const getLeaveBalance = () => axios.get(`${API_BASE_URL}/api/leave-balance`);
const getRequestOverview = () => axios.get(`${API_BASE_URL}/api/request-overview`);
const getLeaveTypes = () => axios.get(`${API_BASE_URL}/api/leave-types`);
const postLeaveRequest = (data) => axios.post(`${API_BASE_URL}/api/leave-request`, data);

export { getLeaveBalance, getRequestOverview, getLeaveTypes, postLeaveRequest };
