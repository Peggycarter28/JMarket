import { useParams } from "react-router-dom"
import GrayContainer from "../../components/Layout/GrayContainer"
import Chats from "../../components/Layout/Chats"
import OrangeContainer from "../../components/Layout/OrangeContainer"
import ChatsCard from "../../components/Layout/ChatsCard"
import VendorChatLayout from "../../components/Layout/VendorChatLayout"
import { useEffect } from "react"

const ChatVendor = () => {
    const { category, title } = useParams()

    useEffect(
        () => {
            title !== undefined ?
            document.title = `Chats with ${title} | Bauchi Connect`
            :
            document.title = `Chats | Bauchi Connect`
        }, []
    )

    return (

        <VendorChatLayout>
            <main className="flex-1 flex border gap-4 p-4">
                <div className="flex-[4] border rounded-[17px] bg-[#F9F9F9] p-4 flex flex-col">
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
                        <ChatsCard />
                        <ChatsCard />
                        <ChatsCard />
                        <ChatsCard />
                        <ChatsCard />
                        <ChatsCard />
                        <ChatsCard />
                    </div>

                </div>

                {/* Chat Area */}
                <div className="flex-[8]  flex flex-col border rounded-[17px] bg-[#F9F9F9] bg-auth_form_image">
                    <div className="flex border gap-4 items-center justify-between h-[101px] bg-[#EDEDED] m-4 overflow-hidden rounded-[16px]">

                        <div className="flex gap-4 items-center">
                            <div className="size-[81px] rounded-full overflow-hidden">
                                <img className="h-[81px]" src="/product.png" alt="" />
                            </div>

                            <div>
                                <p>{title}</p>
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
                                <Chats type={"reply"} time={"9:30am"} message={""} />
                                <Chats type={"reply"} time={"10:00pm"} message={""} />
                                <Chats type={"response"} time={"12:33PM"} message={""} />
                                <Chats type={"reply"} time={"4:10AM"} message={""} />
                            </div>
                        </div>
                    </div>
                    {/* Text Area */}
                    <div className="p-2 flex gap-2 w-full border">
                        <GrayContainer rounded={true}>
                            <div className="flex items-center">
                                <img src="/photo-add.svg" className="size-[32px]" />
                                <input className="flex-1 bg-transparent p-2" placeholder={`Send message to ${title}`} type="text" name="" id="" />
                            </div>
                        </GrayContainer>

                        <OrangeContainer>
                            <img className="size-[24px]" src="/send.svg" alt="send" />
                        </OrangeContainer>
                    </div>
                </div>
            </main>
        </VendorChatLayout>
    )
}

export default ChatVendor