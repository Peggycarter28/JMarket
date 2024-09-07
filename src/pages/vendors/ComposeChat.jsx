import { useContext, useEffect, useState } from "react";
import GrayContainer from "../../components/Layout/GrayContainer";
import OrangeContainer from "../../components/Layout/OrangeContainer";
import { useParams } from "react-router-dom";
import { sendChatService } from "../../service/chatService";
import { ClipLoader } from "react-spinners";
import { UserContext } from "../../context/AppContextt";

const ComposeChat = ({ updateMessageCallBack, scrollToBottom, }) => {
    const {user, setUser} = useContext(UserContext)
    const [message, setMessage] = useState("");
    const [userr, setUserr] = useState(null); // Local user state
    const [loading, setLoading] = useState(false); // Local user state
    const { receiverId, chatId } = useParams();

    // Get user from local storage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserr(JSON.parse(storedUser));
        }
    }, []);

    const handleSendChat = async () => {
        if (message.trim() && chatId && receiverId && userr && userr.id) {
            try {
                setLoading(true)
                const res = await sendChatService(chatId, message, receiverId, userr.id);

                if (res.status === 200 || res.status === 201) {
                    console.log("Message sent successfully");
                    const newMessage = res.data;

                    updateMessageCallBack(prev => [...prev, newMessage]);
                    setMessage(""); // Clear the input field
                    scrollToBottom(); // Scroll to the bottom after sending
                    setLoading(false)
                } else {
                    alert("Failed to send message. Please try again.");
                    setLoading(false)
                }
            } catch (error) {
                console.error("Error sending message:", error);
                setLoading(false)
                alert("An error occurred while sending the message.");
            }
        } else {
            setLoading(false)
            alert("Unable to send message.");
        }
    };

    return (
        <div className="p-1 flex gap-2 w-full m-2 mb-8">
            {/* Text Area */}
            <GrayContainer rounded={true}>
                <div className="flex items-center">
                    <img src="/photo-add.svg" className="size-[24px] md:size-[32px]" alt="Add Photo" />
                    <textarea
                    rows={1}
                        value={message}
                        onChange={elem => setMessage(elem.target.value)}
                        className="flex-1 text-[12px] md:text-[14px] bg-transparent p-2 appearance-none outline-none"
                        placeholder={`Type Message and send`}
                        type="text"
                    ></textarea>
                </div>
            </GrayContainer>

            <OrangeContainer>
               {loading == true 
               ? <div className="flex w-full h-full justify-center items-center"> <ClipLoader color="#EF6C00" size={18} /></div>
               : <img onClick={handleSendChat} className="size-[24px] cursor-pointer" src="/send.svg" alt="Send" />}
            </OrangeContainer> 
        </div>
    );
};

export default ComposeChat;
