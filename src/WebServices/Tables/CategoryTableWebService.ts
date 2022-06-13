import axios from "axios";

export const CategoryTableWebService = async (token: string) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/category`, {
            headers: {
                'si-access-token': `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        return error;
    }
}