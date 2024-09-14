import axios from "axios"
import { API_URL } from "../constants/config"

export const createTransaction = async (data) => {

    const response = await axios.post(`${API_URL}/api/transactions`, data)

    return response
}

export const sendEmailToVendor = async (emailData) => {

    const response = await axios.post(`https://bconnect-email.onrender.com/send-email`, emailData)

    return response
}

export const fetchTransactions = async (owner_id) => {
    const response = await axios.get(`${API_URL}/api/transactions?owner_id=${owner_id}`)

    return response
}