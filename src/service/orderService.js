import axios from "axios"
import { API_URL } from "../constants/config"

export const createOrder = async (data ) => {

    const response = await axios.post(`${API_URL}/api/orders`, data)

    return response
}


export const getOrders = async (id ) => {

    // const response = await axios.get(`${API_URL}/api/orders?service_id=${serviceId}`)

    const response = await axios.get(`${API_URL}/api/orders?owner=${id}`)

    return response
}


export const updateOrder = async (data, orderId) => {

    const response = await axios.put(`${API_URL}/api/orders/${orderId}`, data)

    return response
    
}