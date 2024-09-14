import axios from "axios"
import { API_URL } from "../constants/config"


export const createVendorService = async (data) => {

    const response = await axios.post(`${API_URL}/api/vendors`, data)
    
    return response
}

export const createVendorWithdrawalService = async (data) => {

    const response = await axios.post(`${API_URL}/api/withdrawal-request`, data)
    
    return response
}

export const getVendorWithdrawalService = async () => {

    const response = await axios.get(`${API_URL}/api/withdrawal-request`)
    
    return response
}


export const getAllVendorsService = async () => {

    const response = await axios.get(`${API_URL}/api/vendors`)
    return response
}

export const getUserVendorsService = async (userId) => {

    const response = await axios.get(`${API_URL}/api/my-services?id=${userId}`)
    return response
}

export const getAllVendorsCategoryService = async () => {

    const response = await axios.get(`${API_URL}/api/local-government`)
    return response
}

export const getVendorCategoriesService = async () => {

    const response = await axios.get(`${API_URL}/api/category`)
    return response
}



export const getVendorByIdService = async (vendorId ) => {

    const response = await axios.get(`${API_URL}/api/vendors/${vendorId}`)

    return response
}


export const getVendorByLgaService = async (lgaSlug ) => {

    const response = await axios.post(`${API_URL}/vendors/getByLga`, {lgaSlug: lgaSlug})

    return response
}

export const getVendorByGpsService = async (latitude, longitude) => {

    const cordinates = {latitude: latitude, longitude: longitude}

    const response = await axios.get(`${API_URL}/api/nearest-vendors?lat=${parseFloat(latitude)}&lon=${parseFloat(longitude)}`)

    return response
}