import { Link } from "react-router-dom"

const DashSideNav = () => {
    return(
    <aside className="w-[75px] md:w-[103px] border bg-white">
        <nav className="flex flex-col items-center gap-6 pt-6">
            <div className="size-[50px] rounded-[25px] flex items-center justify-center">
                <img src="/user_thumbs/thumb.png" alt="Pic" />
            </div>
            
            <Link to={"/dashboard/user"}>
            <img src="/home.svg" alt="Pic" />
            </Link>

            <Link to={"/dashboard/user/chats"}>
            <img src="/chat-menu-icon.svg" className="" alt="Pic" />
            </Link>

            <Link to={"/dashboard/user/settings/profile"}>
            <img src="/setting-menu-icon.svg" alt="Pic" />
            </Link>
        </nav>
    </aside>)
}

export default DashSideNav