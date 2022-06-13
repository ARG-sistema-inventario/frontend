import axios from "axios";

export const ValidateWebServiceToken = async (token: string) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/refresh`, null, {
            headers: {
                'si-access-token': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}