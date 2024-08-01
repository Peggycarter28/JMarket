import axios from "axios"
import { API_URL } from "../constants/config"

export const getReviews = async () => {

    const response = await axios.get(`${API_URL}/api/reviews`)
    
    return response
}

export const viewReviewService = async (chatId ) => {

    const response = await axios.get(`${API_URL}/chat/load`, {chatId: chatId})

    return response
}

export const sendReviewService = async (content, receiverId, senderId, messageTime ) => {

    const response = await axios.post(`${API_URL}/chat/send-message`, {content: content, receiverId: receiverId, senderId: senderId, messageTime: new Date(Date.now())})

    return response
}

export const updateReviewService = async (messageId, newContent ) => {

    const response = await axios.delete(`${API_URL}/chat/update-message`, {messageId: messageId, content: newContent})

    return response
}

export const likeReviewService = async (messageId, content ) => {

    const response = await axios.delete(`${API_URL}/chat/reply-message`, {messageId: messageId, content: newContent})

    return response
}

export const deleteMessage = async (messageId) => {

    const response = await axios.delete(`${API_URL}/chat/delete-message`, {messageId: messageId})

    return response
}

export const deleteChat = async (chatId) => {

    const response = await axios.delete(`${API_URL}/chat/delete-chat`, {chatId: chatId})

    return response
}