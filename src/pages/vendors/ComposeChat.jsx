import { useContext, useState } from "react"
import GrayContainer from "../../components/Layout/GrayContainer"
import OrangeContainer from "../../components/Layout/OrangeContainer"
import { useParams } from "react-router-dom"
import { UserContext } from "../../context/AppContextt"
import { sendChatService } from "../../service/chatService"

const ComposeChat = ({updateMessageCallBack}) => {
    const [message, setMessage] = useState("")

    const { category, serviceId, receiverId, chatId } = useParams()

    const {user, setUser} = useContext(UserContext)

    const handleSendChat = async () => {

        if(message !== "" && chatId !== undefined && receiverId !== undefined && user.id !== undefined)
        {
           const res = await sendChatService(chatId, message, receiverId, user.id)
           
           if (res.status == 200 || res.status == 201)
           {
            console.log("Message sent successfully")
            const newMessage = res.data

            console.log(newMessage)

            updateMessageCallBack(prev => ([...prev, newMessage]))

           }
        }

        else {
            alert("Unable to send message. One or more field empty.")
        }
    }

    return(
       
        <div className="p-2 flex gap-2 w-full border">
             {/* Text Area */}
        <GrayContainer rounded={true}>
            <div className="flex items-center">
                <img src="/photo-add.svg" className="size-[32px]" />
                <input value={message} onChange={elem => {setMessage(elem.target.value)}} className="flex-1 bg-transparent p-2 appearance-none outline-none" placeholder={`Send message to ${"title"}`} type="text" name="" id="" />
            </div>
        </GrayContainer>

        <OrangeContainer>
            <img onClick={handleSendChat} className="size-[24px]" src="/send.svg" alt="send" />
        </OrangeContainer>
    </div>
    )
}

export default ComposeChat