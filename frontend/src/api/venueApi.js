import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/venue";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};


const getVenues = async (filters = {}) => {

    const params = {};

    if (filters.name?.trim()) {
        params.name = filters.name;
    }

    if (filters.state?.trim()) {
        params.state = filters.state;
    }

    if (filters.city?.trim()) {
        params.city = filters.city;
    }

    if (filters.venueType?.trim()) {
        params.venueType = filters.venueType;
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

export const getFilters = async () => {
    const response = await axios.get(`${BASE_URL}/filters`);
    return response.data;
};

export const getMyVenues = async () => {

    const response = await axios.get(
        `${BASE_URL}/my-venues`,
        getAuthHeaders()
    );

    return response.data;
};

export const createVenue = async (venueDetails) => {

    const formData = new FormData();

    formData.append("name", venueDetails.name);
    formData.append("description", venueDetails.description);
    formData.append("venueType", venueDetails.venueType);

    formData.append("address", venueDetails.address);
    formData.append("city", venueDetails.city);
    formData.append("district", venueDetails.district);
    formData.append("state", venueDetails.state);

    formData.append("latitude", venueDetails.latitude);
    formData.append("longitude", venueDetails.longitude);

    formData.append("capacity", venueDetails.capacity);
    formData.append("pricePerHour", venueDetails.pricePerHour);

    // Send amenities as JSON string
    formData.append(
        "amenities",
        JSON.stringify(venueDetails.amenities)
    );

    // Upload all selected images
    venueDetails.images.forEach(image => {
        formData.append("images", image.file);
    });

    const response = await axios.post(
        BASE_URL,
        formData,
        {
            headers: {
                ...getAuthHeaders().headers,
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;

};

export const getVenueTypes = async () => {

    const response = await axios.get(
        `${BASE_URL}/venueTypes`,
        getAuthHeaders()
    );

    return response.data;

};

export const getVenueForEdit = async (id) => {
    const response = await axios.get(
        `${BASE_URL}/owner/${id}`,
        getAuthHeaders()
    );

    return response.data;
};

export const updateVenue = async (id, formData) => {
    const response = axios.patch(
        `${BASE_URL}/${id}`,
        formData,
        {
            headers: {
                ...getAuthHeaders().headers,
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};


export const getAllPendingApprovalVenues = async (
    page = 1,
    limit = 10
) => {

    const response = await axios.get(
        `${BASE_URL}/pending`,
        {
            ...getAuthHeaders(),
            params: {
                page,
                limit
            }
        }
    );

    return response.data;

};


export const approveVenue = async (venueId) => {

    const response = await axios.patch(
        `${BASE_URL}/${venueId}/approve`,
        {},
        getAuthHeaders()
    );

    return response.data;

};

export const rejectVenue = async (venueId) => {

    const response = await axios.patch(
        `${BASE_URL}/${venueId}/reject`,
        {},
        getAuthHeaders()
    );

    return response.data;

};

export default getVenues;