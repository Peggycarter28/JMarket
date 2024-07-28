import { API_URL } from "../constants/config"

export const getAllVendorsService = async () => {

    const response = await axios.get(`${API_URL}/vendors/all`)
    return response
}

export const getAllVendorsCategoryService = async () => {

    const response = await axios.get(`${API_URL}/vendors/all-categories`)
    return response
}

export const getVendorByIdService = async (vendorId ) => {

    const response = await axios.post(`${API_URL}/vendors/${vendorId}`)

    return response
}

export const getVendorByLgaService = async (lgaSlug ) => {

    const response = await axios.post(`${API_URL}/vendors/getByLga`, {lgaSlug: lgaSlug})

    return response
}

export const getVendorByGpsService = async (cordinates ) => {

    const response = await axios.post(`${API_URL}/vendors/getByCordinates`, {cordinates: cordinates})

    return response
}