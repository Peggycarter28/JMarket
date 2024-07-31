import axios from "axios"
import { API_URL } from "../constants/config"

export const getChatsListService = async (userId) => {
   
    console.log("Fetching chats list")

    const response = await axios.get(`${API_URL}/api/chat-list?id=${parseInt(userId)}`)

    return response
}

export const newChatService = async (vendorListingId, receiverId, senderId) => {

    const response = await axios.post(`${API_URL}/api/chat-list`, {receiver: receiverId, sender: senderId, listing: vendorListingId})
    
    return response
}

export const loadChatService = async (chatId ) => {

    console.log("Fetching chats with id: ", chatId)

    const response = await axios.get(`${API_URL}/api/chat?chat_id=${chatId}`)

    return response
}

export const sendChatService = async (chatId, content, receiverId, senderId ) => {
console.log(receiverId)
console.log(typeof receiverId)
    const response = await axios.post(`${API_URL}/api/chat`, 
        {
            chatId: parseInt(chatId),
            receiver: parseInt(receiverId),
            sender: parseInt(senderId),
            content:content
        }
    )

    return response
}

export const updateMessage = async (messageId, newContent ) => {

    const response = await axios.delete(`${API_URL}/chat/update-message`, {messageId: messageId, content: newContent})

    return response
}


export const deleteChat = async (chatId) => {

    const response = await axios.delete(`${API_URL}/chat/delete-chat`, {chatId: chatId})

    return response
}