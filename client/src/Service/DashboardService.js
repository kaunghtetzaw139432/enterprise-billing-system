import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1.0/dashboard";


const getAuthHeaders = () => {
    return { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
};

export const fetchDashboardData = async () => {
    return await axios.get(BASE_URL, {
        headers: getAuthHeaders()
    });
};