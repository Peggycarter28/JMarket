import { useParams } from "react-router-dom"
import GrayContainer from "../../components/Layout/GrayContainer"

const ChatVendor = () => {
    const {category, title} = useParams()
    return (
        <GrayContainer noPadding={true}>
            <div className="flex h-screen">
                <aside className="w-[103px] border bg-white">
                    <nav className="flex flex-col items-center gap-2 pt-4">
                        <div className="bg-[red] size-[50px] rounded-[25px] flex items-center justify-center">
                            <img src="/user_thumbs/thumb.png" alt="Pic" />
                        </div>
                    </nav>
                </aside>
                <main className="flex-1 flex border gap-4 p-4">

                    <div className="flex-[4] border rounded-[17px] bg-[#F9F9F9] p-4">
                        {/* Title */}
                        <h3 className="text-[48px] leading-[58.09px] text-bold">Chat</h3>

                        {/* Chats Search bar */}
                        <div className="border rounded-full h-[50px] bg-[white] flex overflow-hidden">
                        <input type="text" className="appearance-none flex-1 pl-6 decoration-none"  placeholder="Search chat"/>
                        <button className="rounded-full h-[50px] bg-[#EF6C00] text-[white] w-[95px] px-[20px] py-[10px]">
Search
</button>
                        </div>
                    </div>

{/* Chat Area */}
                    <div className="flex-[8] border rounded-[17px] bg-[#F9F9F9] bg-auth_form_image">
                        <div className="flex gap-4 items-center h-[101px] bg-[#EDEDED] m-4 overflow-hidden rounded-[16px]">
                            <div className="size-[81px] rounded-full overflow-hidden">
                                <img className="h-[81px]" src="/product.png" alt="" />
                            </div>

                            <div>
                            <p>{title}</p>
                            <p>Offline</p>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </GrayContainer>)
}

export default ChatVendor