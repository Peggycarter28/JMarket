import axios from "axios"
import { API_URL } from "../constants/config"

export const createOrder = async (data ) => {

    const response = await axios.post(`${API_URL}/api/orders`, data)

    return response
}


export const getOrders = async (serviceId ) => {

    const response = await axios.get(`${API_URL}/api/orders?service_id=${serviceId}`)

    return response
}


export const updateOrder = async (data) => {

    const response = await axios.patch(`${API_URL}/api/orders`, data)

    return response
    
}