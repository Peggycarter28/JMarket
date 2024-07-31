import { useParams } from "react-router-dom"
import Chats from "../../components/Layout/Chats"
import GrayContainer from "../../components/Layout/GrayContainer"
import OrangeContainer from "../../components/Layout/OrangeContainer"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/AppContextt"
import { loadChatService } from "../../service/chatService"
import ComposeChat from "./ComposeChat"

const ChatsArea = () => {

    const { category, serviceId, chatId } = useParams()

    const { user, setUser } = useContext(UserContext)

    const [chats, setChats] = useState([])

    useEffect(
        () => {

            const fetchChats = async () => {

                console.log("Fetching chats")

                const res = await loadChatService(chatId)

                if (res.status == 200 || res.status == 201) {
                    
                    if(res.data.length > chats)
                    {
                    setChats(res.data)
                    }
                    else {
                        // Nothing changed
                    }
                }
                else {
                    alert("Unable to fetch chats")
                }
            }

            const fetchPool = () => {
                setInterval(() => {
                    fetchChats()
                }, 3000);
            }

            chatId !== undefined ? fetchPool() : ""
        }, [])

    return (
        <div className={`${chatId !== undefined ? "" : "hidden"} flex-[8] h-screen flex flex-col border rounded-[17px] bg-[#F9F9F9] bg-auth_form_image`}>
            {/* Chat Area */}
            <div className="flex border gap-4 items-center justify-between h-[101px] bg-[#EDEDED] m-4 overflow-hidden rounded-[16px]">

                <div className="flex items-start gap-4 items-center">
                    <div className="size-[81px] rounded-full overflow-hidden">
                        <img className="h-[81px]" src="/product.png" alt="" />
                    </div>

                    <div>
                        <p>{"title"}</p>
                        <p>Offline</p>
                    </div>
                </div>

                {/* More Icon */}
                <img src="/more.svg" />
            </div>

            {/* Chats */}
            <div className="flex flex-1 flex-col gap-4 justify-end items-center overflow-hidden">
                <div className=" overflow-y-scroll w-full">
                    <div className="flex justify-center">
                        <div className="text-center bg-[#D9D9D9] rounded-[15px] text-[#464B4F] px-2 text-[12px]">Today</div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        {chats.map(chat=>{
                            return(<Chats key={chat.id} type={chat.sender == user.id ? "reply" : "reponse"} time={"9:30am"} message={chat.content} />)
                        })
                    }
                        
                        {/* // <Chats type={"reply"} time={"10:00pm"} message={""} />
                        // <Chats type={"response"} time={"12:33PM"} message={""} />
                        // <Chats type={"reply"} time={"4:10AM"} message={""} /> */}
                    </div>
                </div>
            </div>
            
            {/* Compose Area */}
            <ComposeChat updateMessageCallBack={setChats}/>
        </div>
    )
}

export default ChatsArea