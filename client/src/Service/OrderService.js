import axios from "axios";


const BASE_URL = "http://localhost:3000/api/v1.0/orders"; 


const getAuthHeaders = () => {
    return { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
};

export const createOrder = async (orderData) => {
    return await axios.post(BASE_URL, orderData, { 
        headers: getAuthHeaders() 
    });
};

export const fetchOrders = async () => {
    return await axios.get(`${BASE_URL}/latest`, { 
        headers: getAuthHeaders() 
    });
};

export const deleteOrder = async (orderId) => {
    return await axios.delete(`${BASE_URL}/${orderId}`, { 
        headers: getAuthHeaders() 
    });
};

export const verifyPayment = async (verifyData) => {
    return await axios.post("http://localhost:3000/payments/verify", verifyData, { 
        headers: getAuthHeaders() 
    });
};