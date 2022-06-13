import axios from 'axios';
import RegisterRequest from '../../Models/Request/Register/RegisterRequest';

export const RegisterWebService = async (body: RegisterRequest) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, body);
        return response.data;
    } catch (error) {
        return error;
    }
}