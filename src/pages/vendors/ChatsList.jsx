import { Link, useNavigate, useParams } from "react-router-dom"
import ChatsCard from "../../components/Layout/ChatsCard"
import { useContext, useEffect, useState } from "react"
import { getChatsListService } from "../../service/chatService"
import { UserContext } from "../../context/AppContextt"

const ChatsList = () => {

    const {chatId} = useParams()

    let thisUser;
    // const {user, setUser} = useContext(UserContext)
    const storedUser = localStorage.getItem('user')

    if(storedUser)
    {
        thisUser = JSON.parse(storedUser)
    } 
    const [user, setUser] = useState(thisUser)

    const [chatsList, setChatsList] = useState([])
    
    useEffect(()=>{


        const storedChatsList = localStorage.getItem('myChatsList')

        if(storedChatsList)
            {
                setChatsList(JSON.parse(storedChatsList))
            } 

        const fetchChats = async () =>{

            const res = await getChatsListService(user?.id)

            if(res.status == 200 || res.status == 201)
            {
                localStorage.setItem('myChatsList', JSON.stringify(res.data))
                setChatsList(res.data)
            }
            else{
                alert("Unable to fetch chats")
            }
        }

        fetchChats()
    }, [])

    const nav = useNavigate();

    const handleBack = () => {
        nav(-1)


    }   
    return(
        <div className={` ${chatId !== undefined ? "hidden md:flex" : ""}  flex-[4] border rounded-[17px] bg-[#F9F9F9] p-4 flex-col`}>
        {/* Title */}
        <h3 className="text-[48px] leading-[58.09px] text-bold">Chat</h3>

        {/* Chats Search bar */}
        <div className="border rounded-full h-[50px] bg-[white] flex overflow-hidden mb-2">
            <input type="text" className="appearance-none flex-1 pl-6 decoration-none" placeholder="Search chat" />
            <button className="rounded-full h-[50px] bg-[#EF6C00] text-[white] w-[95px] px-[20px] py-[10px]">
                Search
            </button>
        </div>

        <div className="overflow-y-scroll flex-1">
            {/* Chats Collections */}
            
            {
                chatId == undefined ? chatsList.map(data =><ChatsCard key={data.chatUniqueId} data={data} userId={user.id} />)
                : <button className="border-b border-b-[2px] p-4" onClick={handleBack}>&lt; Back to Chats List</button>
}
        </div>

    </div>
    )
}

export default ChatsList