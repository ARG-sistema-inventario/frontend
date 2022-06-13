import axios from "axios";
import CreateAssetRequest from "../../Models/Request/Asset/CreateAssetRequest";

export const CreateAssetWebService = async (token: string, asset: CreateAssetRequest) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/assets`, asset, {
            headers: {
                'si-access-token': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}