import axios from "axios"
import { getChatsListService, newChatService } from "../../service/chatService"
import { useContext, useEffect, useState } from "react"
import CTAButton from "../../components/Forms/Buttons/CTAButton"
import { UserContext } from "../../context/AppContextt"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

const MessageVendorButton = ({listing_id, receiver_id}) => {

    const [existing, setExisting] = useState([])

    const [loading, setLoading] = useState(false)

    const [userState, setUserState] = useState(null)

    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate()

    const handleChat = async () => {

        if(Cookies.get('token'))

        {
            setLoading(true)
            if(receiver_id == user.id){
                alert("Sorry! you cannot chat yourself")
                setLoading(false)
                return
            }
               if(existing.length > 0)
            {
                let thisChat = existing.filter(chat =>{ return chat.listing.id == listing_id && (chat.receiver.id == receiver_id || chat.receiver.id == user.id || chat.sender.id == receiver_id || chat.sender.id == user.id)})

                console.log(existing)

                console.log(thisChat.length)

                if(thisChat.length > 0)
                {
                    console.log("Old chats found")

                    setTimeout(() => {
                        setLoading(false)
                        navigate(`/dashboard/user/chats/${receiver_id}/${thisChat[0].id}`) 
                    }, 1500);
                    
                    
                }
            

            else {
                // create new chat
                const newChatList = await newChatService(listing_id, receiver_id, userState.id)

                if(newChatList.status == 201 || newChatList.status == 200)
                {
                    existing.push(newChatList.data)

                    localStorage.setItem('myChatsList', JSON.stringify(existing))

                    console.log("New chat created")
                    setTimeout(() => {
                        setLoading(false)
                        navigate(`/dashboard/user/chats/${receiver_id}/${newChatList.data.id}`)
                    }, 1500);

                   
                }
            }
        }
        else {
            // No chats at all. Still create a new chat list as above and proceed
            // create new chat
            const newChatList = await newChatService(listing_id, receiver_id, userState.id)

            if(newChatList.status == 201 || newChatList.status == 200)
            {
                existing.push(newChatList.data)

                localStorage.setItem('myChatsList', JSON.stringify(existing))

                console.log("New chat created")
                setTimeout(() => {
                    setLoading(false)
                    navigate(`/dashboard/user/chats/${receiver_id}/${newChatList.data.id}`)
                }, 1500);

               
            }
        
        }
        }
        else{
            // Not Logged In
            Alert("Log in to chat with Vendor")
        }
    }

    useEffect(()=>{
        const storedUser = localStorage.getItem('user')

        if(storedUser)
            {
                setUserState(JSON.parse(storedUser))
            }

            const storedChatsList = localStorage.getItem('myChatsList')

            if(storedChatsList)
                {
                    setExisting(JSON.parse(storedChatsList))
                }
    }, [])

    return(
   <div onClick={handleChat}>
            <CTAButton loadingState={loading} iconBtnUrl="/message-text.svg" isIconBtn={true} title={user.lang == 'ha' ? `Message` :`Message`} />
            </div>
    )
}

export default MessageVendorButton