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



export const updateProfile = async (data, profileId) => {

    console.log("Calling update service")

    const response = await axios.put(`${API_URL}/api/update-profile/${profileId}`, data,{
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



// New logout service
export const logoutService = async (authToken) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/token/logout`,
        {},
        {
          headers: {
            Authorization: `Token ${authToken}`, // Pass the token for authentication
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }