import axios from "axios"

export const createOrder = async (data ) => {

    const response = await axios.post(`${API_URL}/api/payment/verify`, data)

    return response
}