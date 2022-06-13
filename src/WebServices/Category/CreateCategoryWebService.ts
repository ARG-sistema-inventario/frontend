import axios from "axios";
import CreateCategoryRequest from "../../Models/Request/Category/CreateCategoryRequest";

export const CreateCategoryWebService = async (token: string, category: CreateCategoryRequest) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/category`, category, {
            headers: {
                'si-access-token': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}