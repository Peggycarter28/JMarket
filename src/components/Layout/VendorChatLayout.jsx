import { Link } from "react-router-dom"
import GrayContainer from "./GrayContainer"

const VendorChatLayout = ({ children }) => {
    return (
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

                {children}

            </div>
        </GrayContainer>
    )
}

export default VendorChatLayout