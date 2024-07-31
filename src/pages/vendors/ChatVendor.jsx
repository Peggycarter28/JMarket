import { useParams } from "react-router-dom"
import GrayContainer from "../../components/Layout/GrayContainer"
import Chats from "../../components/Layout/Chats"
import OrangeContainer from "../../components/Layout/OrangeContainer"
import ChatsCard from "../../components/Layout/ChatsCard"
import VendorChatLayout from "../../components/Layout/VendorChatLayout"
import { useEffect } from "react"
import ChatsList from "./ChatsList"
import ChatsArea from "./ChatsArea"

const ChatVendor = () => {
    const { category, serviceId } = useParams()

    console.log(serviceId)

    useEffect(
        () => {
            serviceId !== undefined ?
            document.title = `Chats with ${"title"} | Bauchi Connect`
            :
            document.title = `Chats | Bauchi Connect`
        }, []
    )

    return (

        <VendorChatLayout>
            <main className="flex-1 h-screen overflow-hidden flex flex-col md:flex-row border gap-4">

               <ChatsList/>

               <ChatsArea/>
               
            </main>
        </VendorChatLayout>
    )
}

export default ChatVendor