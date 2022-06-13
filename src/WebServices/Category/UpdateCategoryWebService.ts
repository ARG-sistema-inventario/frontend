import axios from "axios";
import UpdateCategoryRequest from "../../Models/Request/Category/UpdateCategoryRequest";

export const UpdateCategoryWebService = async (id: number, token: string, category: UpdateCategoryRequest) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/category/${id}`, category, {
            headers: {
                'si-access-token': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}
