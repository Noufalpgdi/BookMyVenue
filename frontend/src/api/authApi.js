import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/auth";

const login = async (email, password) => {
    const response = await axios.post(
        `${BASE_URL}/login`,
        {
            email,
            password
        }
    );

    return response.data;
}

export default login;