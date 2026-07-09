import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/venue";

const getVenues = async (filters = {}) => {

    const params = {};

    if (filters.city?.trim()) {
        params.city = filters.city;
    }

    if (filters.capacity) {
        params.capacity = filters.capacity;
    }

    const response = await axios.get(BASE_URL, {
        params
    });

    return response.data;
};

export const getVenueById = async (id) => {

    const response = await axios.get(`${BASE_URL}/${id}`);

    return response.data;
};

export default getVenues;