import { Link } from "react-router-dom"
import ChatsCard from "./ChatsCard"
import GrayContainer from "./GrayContainer"

const UserDashboardLayout = ({ children }) => {
    return (
        <>
            <GrayContainer noPadding={true}>
                <div className="flex h-screen">
                    <aside className="w-[103px] border bg-white">
                        <nav className="flex flex-col items-center gap-2 pt-4">
                            <div className="bg-[red] size-[50px] rounded-[25px] flex items-center justify-center">
                                <img src="/user_thumbs/thumb.png" alt="Pic" />
                            </div>

                            <Link to={""}>
                                <img src="/home.svg" alt="Pic" />
                            </Link>

                            <Link to={""}>
                                <img src="/chat-menu-icon.svg" alt="Pic" />
                            </Link>

                            <Link to={""}>
                                <img src="/setting-menu-icon.svg" alt="Pic" />
                            </Link>
                        </nav>
                    </aside>
                    <main className="flex-1 flex border gap-4 p-4">
                        <div className="flex-[4] border rounded-[17px] bg-[#F9F9F9] p-4 flex flex-col">
                            {/* Title */}
                            <h3 className="text-[48px] leading-[58.09px] text-bold">Chat</h3>

                            <div className=" flex-1">
                                {/* Settings Collections */}
                                <ChatsCard />
                                
                            </div>

                        </div>

                        {/* Chat Area */}
                        <div className="flex-[8]  flex flex-col border rounded-[17px] bg-[#F9F9F9] ">
                            {children}
                        </div>
                    </main>
                </div>
            </GrayContainer>
        </>
    )
}

export default UserDashboardLayout