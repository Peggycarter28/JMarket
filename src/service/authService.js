import axios from "axios"
import { API_URL } from "../constants/config"

export const loginService = async (email, password) => {

    const response = await axios.post(`${API_URL}/api/auth/token/login`, {"username":email, "password": password} )

    // 

    return response
}

export const registerService = async (username, email, password, repeatPassword) => {

    console.log("Calling service")



    const response = await axios.post(`${API_URL}/api/auth/users/`, {
        "username": `${username}`,
        "email": `${email}`,
        "password": `${password}`,
        "re_password": `${repeatPassword}`
    },{
        headers:{
        "Content-Type":"application/json"
    }})


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