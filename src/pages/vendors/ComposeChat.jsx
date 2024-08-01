import { useEffect, useState } from "react";
import GrayContainer from "../../components/Layout/GrayContainer";
import OrangeContainer from "../../components/Layout/OrangeContainer";
import { useParams } from "react-router-dom";
import { sendChatService } from "../../service/chatService";

const ComposeChat = ({ updateMessageCallBack, scrollToBottom }) => {
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null); // Local user state
    const { receiverId, chatId } = useParams();

    // Get user from local storage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSendChat = async () => {
        if (message.trim() && chatId && receiverId && user && user.id) {
            try {
                const res = await sendChatService(chatId, message, receiverId, user.id);

                if (res.status === 200 || res.status === 201) {
                    console.log("Message sent successfully");
                    const newMessage = res.data;

                    updateMessageCallBack(prev => [...prev, newMessage]);
                    setMessage(""); // Clear the input field
                    scrollToBottom(); // Scroll to the bottom after sending
                } else {
                    alert("Failed to send message. Please try again.");
                }
            } catch (error) {
                console.error("Error sending message:", error);
                alert("An error occurred while sending the message.");
            }
        } else {
            alert("Unable to send message. One or more fields are empty.");
        }
    };

    return (
        <div className="p-2 flex gap-2 w-full border m-2 mb-8">
            {/* Text Area */}
            <GrayContainer rounded={true}>
                <div className="flex items-center">
                    <img src="/photo-add.svg" className="size-[32px]" alt="Add Photo" />
                    <input
                        value={message}
                        onChange={elem => setMessage(elem.target.value)}
                        className="flex-1 bg-transparent p-2 appearance-none outline-none"
                        placeholder={`Send message to ${receiverId || "User"}`}
                        type="text"
                    />
                </div>
            </GrayContainer>

            <OrangeContainer>
                <img onClick={handleSendChat} className="size-[24px] cursor-pointer" src="/send.svg" alt="Send" />
            </OrangeContainer>
        </div>
    );
};

export default ComposeChat;
