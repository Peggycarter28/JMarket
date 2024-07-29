import { Link } from "react-router-dom"
import GrayContainer from "./GrayContainer"
import DashSideNav from "./DashSideNav"

const VendorChatLayout = ({ children }) => {
    return (
        <GrayContainer noPadding={true}>
            <div className="flex h-screen gap-2">
                <DashSideNav/>
                {children}
            </div>
        </GrayContainer>
    )
}

export default VendorChatLayout