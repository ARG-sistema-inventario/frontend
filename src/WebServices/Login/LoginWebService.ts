import axios from "axios";
import LoginRequest from "../../Models/Request/Login/LoginRequest";

export const LoginWebService = async (body: LoginRequest) => {
    console.log(body)
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, body);
        return response.data;
    } catch (error) {
        return error;
    }
}