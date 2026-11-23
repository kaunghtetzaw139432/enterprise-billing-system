import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1.0/payments";

const getAuthHeaders = () => {
    return { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
};


export const createStripeOrder = async (paymentData) => {
    return await axios.post(`${BASE_URL}/create-order`, paymentData, {
        headers: getAuthHeaders()
    });
};

export const verifyPayment = async (verifyData) => {
    return await axios.post(`${BASE_URL}/verify`, verifyData, {
        headers: getAuthHeaders()
    });
};