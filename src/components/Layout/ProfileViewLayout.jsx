import { Link } from "react-router-dom"
import ChatsCard from "./ChatsCard"
import GrayContainer from "./GrayContainer"

const ProfileViewLayout = ({ children }) => {
    return (
        <>
            <GrayContainer noPadding={true}>
                <div className="flex h-screen">
                    
                    <main className="flex-1 flex border gap-4 p-4 px-20">
                        {/* Profile Details Area */}
                        <div className="flex-[8]  flex flex-col border rounded-[17px] bg-[#F9F9F9] p-4">
                            {children}
                        </div>


                    </main>
                </div>
            </GrayContainer>
        </>
    )
}

export default ProfileViewLayout