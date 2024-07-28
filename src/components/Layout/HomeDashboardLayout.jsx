import { Link, useParams } from "react-router-dom"
import GrayContainer from "./GrayContainer"
import DashSideNav from "./DashSideNav"

const HomeDashboardLayout = ({ children }) => {

    const { curr_section } = useParams()

    const sub_sections = [
        { name: "Profile Details", slug: "profile" },
        { name: "Recently Viewed", slug: "viewed" },
        { name: "Settings", slug: "settings" }
    ]

    return (
        <>
            <GrayContainer noPadding={true}>
                <div className="flex h-screen">
                    <DashSideNav />
                    <main className="flex-1 flex border gap-4 p-4">
                    <div className="flex-[4] border rounded-[17px] bg-[#F9F9F9] p-4 flex flex-col justify-center items-center">
                            {/* Title */}
                            <h3 className="py-8">
                                <img className="" src="/logo.svg" alt="BauchiConnect Logo" />
                            </h3>

                            {/* USer Details */}
                            <h4 className="text-[#464B4F] text-[24px] fw-600">Barakat Laushi</h4>
                            <p className="text-[#808080] text-[16px]">barakalaushi@gmail.com</p>


                       
                                {/*Logout */}

                                <button className="bg-[#808080] px-[16px] py-[12px] mt-4 text-[white] rounded">Logout</button>

                                <div className="flex-1"></div>
                        </div>

                         {/* Chat Area */}
                         <div className="flex-[8] p-4 flex flex-col border rounded-[17px] bg-[#F9F9F9] ">
                            {children}
                        </div>


                    

                       
                    </main>
                </div>
            </GrayContainer>
        </>
    )
}

export default HomeDashboardLayout