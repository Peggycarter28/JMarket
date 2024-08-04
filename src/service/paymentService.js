import axios from "axios"
import { API_URL } from "../constants/config"

export const initializePayment = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/api/payment`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error("Payment error:", error.response ? error.response.data : error.message);
        throw error; // Rethrow the error to be handled in the modal
    }
};

export const verifyPayment = async (reference ) => {

    const response = await axios.get(`${API_URL}/api/payment/verify/${reference}`)

    return response
}

export const forgotPasswordService = async (email, username, password, ) => {

    const response = await axios.post(`${API_URL}/api-v1/auth/login`, {username: username, email:email, password: password})

    return response
}

export const activateAccountService = async (token, email, ) => {

    const response = await axios.post(`${API_URL}/api-v1/auth/login`, {username: username, email:email, password: password})

    return response
}