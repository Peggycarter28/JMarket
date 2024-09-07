import { useContext } from "react"
import { UserContext } from "../../context/AppContextt"
import { Link } from "react-router-dom"

const SidebarItem = ({ itemObject }) => {

    console.log(itemObject)

    const { user, setUser } = useContext(UserContext)

    return (
        <Link to={`/search/category/${itemObject.id}`}>
            <div className="w-[120px] md:w-auto bg-[#F5F5F5] md:bg-none flex md:bg-none overflow-hidden gap-2 py-2 px-2 md:px-none">
                <img className="size-[25px] md:size-[50px]  rounded-full bg-white" src={itemObject.image_url} />
                <div>
                    {user.lang == "ha"
                        ? <h4 className=" font-bold text-[#464B4F] text-[16px] leading-[19.36px]">{itemObject.name_ha}</h4>
                        :
                        <>
                            <h4 className=" font-bold text-[#464B4F] text-[16px] leading-[19.36px]">{itemObject.name}</h4>
                            <p className="text-[#808080] text-[14px]">{itemObject.count} Vendors</p>
                        </>
                    }
                </div>
            </div>
        </Link>
    )
}
export default SidebarItem