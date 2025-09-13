import { Link, useNavigate, useParams } from "react-router-dom"
import ChatsCard from "../../components/Layout/ChatsCard"
import { useContext, useEffect, useState } from "react"
import { getChatsListService } from "../../service/chatService"
import { UserContext } from "../../context/AppContextt"

const ChatsList = () => {

    const {chatId} = useParams()

    let thisUser;
    const {user, setUser} = useContext(UserContext)
    const storedUser = localStorage.getItem('user')

    if(storedUser)
    {
        thisUser = JSON.parse(storedUser)
    } 
    const [userr, setUserr] = useState(thisUser)

    const [chatsList, setChatsList] = useState([])
    
    useEffect(()=>{


        const storedChatsList = localStorage.getItem('myChatsList')

        if(storedChatsList)
            {
                setChatsList(JSON.parse(storedChatsList))
            } 

        const fetchChats = async () =>{

            const res = await getChatsListService(userr?.id)

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




    const handleLangUpdate = (lang) => {
        setUser(prev => ({...prev, lang: lang}))
       }


    return(
        <div className={` ${chatId !== undefined ? "hidden md:flex" : ""}  flex-[4] border rounded-[17px] bg-[#F9F9F9] p-4 flex-col`}>
        {/* Title */}
        <div className="flex justify-between">
            <h3 className="text-[48px] leading-[58.09px] text-bold">Chat</h3>
           {/* Translate Bar Icon */}
   
                <select onChange={elem => {handleLangUpdate(elem.target.value)}} className="text-right" id="">
                    <option value="">..select language</option>
                    <option value="en">English</option>
                    <option value="ha">Hausa</option>
                </select>
        </div>
            

        {/* Chats Search bar */}
        <div className="border rounded-full h-[50px] bg-[white] flex overflow-hidden mb-2">
            <input type="text" className="appearance-none flex-1 pl-6 decoration-none" placeholder="Search chat" />
            <button className="rounded-full h-[50px] bg-[#993420] text-[white] w-[95px] px-[20px] py-[10px]">
                Search
            </button>
        </div>

        <div className="overflow-y-scroll flex-1">
            {/* Chats Collections */}
            
            {
                chatId == undefined && chatsList.length !== 0 ? chatsList.map(data =><ChatsCard key={data.chatUniqueId} data={data} userId={userr.id} />)
                : chatsList.length == 0 ? <p>Inbox is empty</p>
                    : <button className="border-b border-b-[2px] p-4" onClick={handleBack}>&lt; Back to Chats List now</button>
}
        </div>

    </div>
    )
}

export default ChatsList