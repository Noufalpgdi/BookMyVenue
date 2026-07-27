import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/payments";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const createPaymentOrder = async (bookingId) => {

    const response = await axios.post(
        `${BASE_URL}/create-order`,
        { bookingId },
        getAuthHeaders()
    );

    return response.data;
};

export const verifyPayment = async (paymentData) => {

    const response = await axios.post(
        `${BASE_URL}/verify`,
        paymentData,
        getAuthHeaders()
    );

    return response.data;
};