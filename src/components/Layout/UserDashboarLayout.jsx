import { Link, useParams } from "react-router-dom"
import ChatsCard from "./ChatsCard"
import GrayContainer from "./GrayContainer"
import DashSideNav from "./DashSideNav"
import { useEffect, useState } from "react"

const UserDashboardLayout = ({ children }) => {

    const { curr_section } = useParams()

    const [user, setUser] = useState(null)

    useEffect(()=>{
        const storedUser = localStorage.getItem('user')

        if(storedUser)
        {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const sub_sections = [
        { name: "Profile Details", slug: ["profile", "edit-profile"]},
        { name: "Recently Viewed", slug: ["viewed"] },
        { name: "Settings", slug: ["settings"] }
    ]

    return (
        <>
            <GrayContainer noPadding={true}>
                <div className="flex h-screen">
                    <DashSideNav />
                    <main className="flex-1 flex flex-col md:flex-row border gap-4 p-4">
                        <div className="flex-[4] border rounded-[17px] bg-[#F9F9F9] p-4 flex flex-col justify-center items-center">
                            {/* Title */}
                            <h3 className="py-8">
                                <img className="" src="/logo.svg" alt="BauchiConnect Logo" />
                            </h3>

                            {/* USer Details */}
                            <h4 className="text-[#464B4F] text-[24px] fw-600">{user?.username}</h4>
                            <p className="text-[#808080] text-[16px]">{user?.email}</p>


                            {/* User Settings */}
                            <div className=" flex-1 w-full">
                                {/* Settings Collections */}
                                <ul className="">
                                    {
                                        sub_sections.map(sec =>
                                            <Link key={sec.slug[0]} to={`../settings/${sec.slug[0]}`}>
                                                <li className={`rounded-[12px] bg-[#F2F2F2] px-[24px] py-[20px] flex gap-[10px] mt-2 text-[#808080] text-bold ${ sec.slug.includes(curr_section) ? "bg-[green] text-[white]" : ""}`}>

                                                    {sec.name}

                                                </li>
                                            </Link>
                                        )
                                    }
                                </ul>

                            </div>

                        </div>

                        {/* Chat Area */}
                        <div className="flex-[8] p-4 md:flex flex-col border rounded-[17px] bg-[#F9F9F9] overflow-y-scroll">
                            {children}
                        </div>
                    </main>
                </div>
            </GrayContainer>
        </>
    )
}

export default UserDashboardLayout