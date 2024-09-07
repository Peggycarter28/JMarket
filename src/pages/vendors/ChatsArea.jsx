import { useParams } from "react-router-dom";
import Chats from "../../components/Layout/Chats";
import { useContext, useEffect, useRef, useState } from "react";
import { loadChatService } from "../../service/chatService";
import ComposeChat from "./ComposeChat";
import { UserContext } from "../../context/AppContextt";

const ChatsArea = () => {
    const {user, setUser} = useContext(UserContext)

    const { chatId } = useParams();

    const storedUser = localStorage.getItem('user');
    const thisUser = storedUser ? JSON.parse(storedUser) : null;
    const [userr, setUserr] = useState(thisUser);
    const [chats, setChats] = useState([]);
    const chatsRef = useRef(null);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await loadChatService(chatId);
                if (res.status === 200 || res.status === 201) {
                    const newChats = res.data;

                    if (newChats.length > 0 && JSON.stringify(newChats) !== JSON.stringify(chats)) {
                        localStorage.setItem(`chat-${chatId}`, JSON.stringify(newChats));
                        setChats(newChats);
                        
                    }
                } else {
                    alert("Unable to fetch chats");
                }
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };

        const initialChats = localStorage.getItem(`chat-${chatId}`);
        if (initialChats) {
            setChats(JSON.parse(initialChats));
        }
        
        fetchChats();

        const intervalId = setInterval(fetchChats, 25000);
        
        return () => clearInterval(intervalId); // Clean up interval on unmount
    }, [chatId]); // Depend only on chatId

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom when chats update
        console.log(chats)
    }, [chats]); // Trigger when chats chan
    const scrollToBottom = () => {
        if (chatsRef.current) {
            chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
        }
    }; 




    return (
        <div className={`${chatId ? "" : "hidden"} flex-[8] h-screen flex flex-col border rounded-[17px] bg-[#F9F9F9] bg-auth_form_image`}>
            
         
            {/* Chat Area */}
            <div className="flex border gap-4 items-center justify-between h-[70px] md:h-[101px] bg-[#EDEDED] m-4 overflow-hidden rounded-[16px]">
                <div className="flex items-start gap-4">
                    <div className="size-[50px] md:size-[81px] rounded-full overflow-hidden">
                        {/* <img className="h-[50px] md:h-[81px]" src={chats[0]?.receiver.id == userr.id ? chats[0]?.receiver.username : chats[0]?.sender.username} alt="" /> */}
                    </div>

                    <div>
                        <p>{chats[0]?.sender.id == userr.id ? chats[0]?.receiver.username : chats[0]?.sender.username}</p>
                        <p>Offline</p>
                    </div>

                </div>
                <img src="/more.svg" alt="More Options" />
            </div>

            {/* Chats */}
            <div className="flex flex-1 flex-col gap-4 justify-end items-center overflow-hidden">
                <div ref={chatsRef} className="overflow-y-scroll w-full">
                    <div className="flex justify-center">
                        <div className="text-center bg-[#D9D9D9] rounded-[15px] text-[#464B4F] px-2 text-[12px]">Today</div>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        {chats.map(chat => (
                            
                            <Chats key={chat?.id} type={chat?.sender.id === userr.id ? "reply" : "response"} time={Date(chat?.date)} message={user.lang == 'en' ? chat?.content : chat.content_hausa} />

                        ))}
                        
                    </div>
                </div>
            </div>
            
            {/* Compose Area */}
            <ComposeChat scrollToBottom={scrollToBottom} updateMessageCallBack={setChats} />

            
        </div>
    );
};

export default ChatsArea;
