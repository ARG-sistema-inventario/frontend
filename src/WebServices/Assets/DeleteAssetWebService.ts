import axios from "axios";

export const DeleteAssetWebService = async (id: number, token: string) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/assets/${id}`, {
            headers: {
                'si-access-token': `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        return error;
    }
}