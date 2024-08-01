import { useEffect, useState } from "react"
import SidebarItem from "./SidebarItem"
import { getVendorCategoriesService } from "../../service/vendorListingService"
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin"
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles"

const LeftsideBar = () => {
    const name = "leftsidebar"

    const [categories, setCategories] = useState([])

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        console.log("Viewing categories")

        const storedCategories = localStorage.getItem('categories')

        if(storedCategories) {
            setCategories(JSON.parse(storedCategories))
        }

        const fetch = async () => {
            
            const res = await getVendorCategoriesService()

            if (res.status == 200 || res.status == 201) {

                setCategories(res.data)
                
                localStorage.setItem('categories', JSON.stringify(res.data))
                
                setLoaded(true)
            }
            else { alert("Unable to fetch categories") 
                setLoaded(true)
            }
        }

        fetch()
    }, [name])

    return(
        <aside className="w-full md:w-[20vw] gap-4 md:gap-none overflow-auto flex md:flex-col mr-none md:mr-4 p-4 h-[90px] md:h-screen md:bg-[#F5F5F5] border border-[#EBEBEB] rounded-lg">
           <div className="flex md:flex-col gap-4 md:gap-1">
            {
            loaded == true && categories.length > 0 ? categories.map((item, index)=>{
                return <SidebarItem key={item.name+index} itemObject={item} />
            })
            : loaded == true && categories.length == 0
            ? <p>No categories found</p> 
            : <div className="flex justify-center w-full bg-[gray]"> <SpinningCircles color="#110000" className="text-black" fontSize={12}/></div>
        }
            </div>
        </aside>
           )
}
export default LeftsideBar