import axios from "axios"
import { getChatsListService, newChatService } from "../../service/chatService"
import { useContext, useEffect, useState } from "react"
import CTAButton from "../../components/Forms/Buttons/CTAButton"
import { UserContext } from "../../context/AppContextt"
import { useNavigate } from "react-router-dom"

const MessageVendorButton = ({listing_id, receiver_id}) => {

    const [existing, setExisting] = useState([])

    const [userState, setUserState] = useState(null)

    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate()

    const handleChat = async () => {
               if(existing.length > 0)
            {
                let thisChat = existing.filter(chat =>{ return chat.listing.id == listing_id && (chat.receiver.id == receiver_id || chat.receiver.id == user.id || chat.sender.id == receiver_id || chat.sender.id == user.id)})

                console.log(listing_id)

                console.log(receiver_id)

                console.log(existing)

                console.log(thisChat.length)

                if(thisChat.length > 0)
                {
                    console.log("Old chats found")
                    
                    

      navigate(`/dashboard/user/chats/${receiver_id}/${thisChat[0].id}`)
                    // window.location.pathname = 
                }
            }
            else {
                // create new chat
                const newChatList = await newChatService(listing_id, receiver_id, userState.id)

                if(newChatList.status == 201 || newChatList.status == 200)
                {
                    existing.push(newChatList.data)

                    localStorage.setItem('myChatsList', JSON.stringify(existing))

                    console.log("New chat created")

                    navigate(`/dashboard/user/chats/${receiver_id}/${newChatList.data.id}`)

                }
                
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
            <CTAButton iconBtnUrl="/message-text.svg" isIconBtn={true} title={user.lang == 'ha' ? `Message` :`Message`} />
            </div>
    )
}

export default MessageVendorButton