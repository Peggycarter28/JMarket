import { API_URL } from "../constants/config"

export const loginService = async (email, password) => {

    const response = await axios.post(`${API_URL}/api-v1/auth/login`, {username: username, password: password})

    return response
}

export const registerService = async (email, username, password, ) => {

    const response = await axios.post(`${API_URL}/api-v1/auth/login`, {username: username, email:email, password: password})

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