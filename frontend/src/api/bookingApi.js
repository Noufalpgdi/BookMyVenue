import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/bookings";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const createBooking = async (bookingData) => {

    const response = await axios.post(
        BASE_URL,
        bookingData,
        getAuthHeaders()
    );

    return response.data;
};

export const getMyBookings = async (page = 1, limit = 10) => {

    const response = await axios.get(
        `${BASE_URL}/my-bookings?page=${page}&limit=${limit}`,
        getAuthHeaders()
    );

    return response.data;
};

export const getBookingById = async (id) => {

    const response = await axios.get(
        `${BASE_URL}/${id}`,
        getAuthHeaders()
    );

    return response.data;
};

export const cancelBooking = async (id) => {

    const response = await axios.patch(
        `${BASE_URL}/${id}/cancel`,
        {},
        getAuthHeaders()
    );

    return response.data;
};

export const getBookingsByVenue = async (venueId, page = 1, limit = 10) => {

    const response = await axios.get(
        `${BASE_URL}/venue/${venueId}?page=${page}&limit=${limit}`,
        getAuthHeaders()
    );

    return response.data;
};