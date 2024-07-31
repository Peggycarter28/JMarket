import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllVendorsService } from "../../service/vendorListingService"
import { UserContext } from "../../context/AppContextt"

const TopVendorsCard = ({ title}) => {

    
   const {user, setUser} = useContext(UserContext)

    const [items, setItems] = useState([])

    useEffect(() => {
        console.log("Vendors Area")

        const fetch = async () => {
            
            const res = await getAllVendorsService()

            if (res.status == 200 || res.status == 201) {

                console.log(res.data)

                setItems(res.data)
            }
            else { alert("Unable to fetch vendors") }
        }

        fetch()
    }, [])

    return (
        <div className="flex-1">
            <h5 className="font-bold text-[24px] p-4 md:p-1">
                {title}
            </h5>

            <div className="flex flex-wrap gap-8 w-full">
                {
                    items.length == 0
                        ? "No Vendors found"

                        : items.map((item, index) => {
                            return <div key={index} className="w-full m-2 md:w-[200px] border md:border-none rounded-lg p-2">
                                {/* Image Container */}
                                <Link to={`/service/${item.category.name}/${item.id}`}>
                                    <div className="w-full md:w-auto h-[190px] md:h-auto rounded-lg overflow-hidden border">
                                        <img className="w-full md:w-[200px] h-auto md:h-[120px] bg-green-600" src="./product.png" />
                                    </div>
                                </Link>

                                {/* Title row */}

                                <div className="flex flex-row justify-between">
                                    <Link to={`/service/${item.category.name}/${item.id}`}>
                                        <div className="flex-10">
                                            <h3 className="font-bold text-[16px] text-[#464B4F]">{item.name}</h3>
                                        </div>
                                    </Link>
                                    <div className="flex-2 flex gap-1 items-start">
                                        <div className="flex-2 flex gap-1 items-center text-[#808080] text-[12px]">
                                            ({Math.round(item.rating)}) <img className="w-[12px] h-[12px]" src={item.image_url} /> //./vendors-star.svg
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[12px] text-[#808080] flex gap-1 items-center">
                                    <img className="w-[12px] h-[12px]" src="./vendors-location.svg" /> {item.local_government.name}
                                </div>
                                {
                                user.lang == 'ha'
                                ? 
                                <p className="text-[#808080] text-[12px]">{item.description_ha}</p>
                                :<p className="text-[#808080] text-[12px]">{item.description}</p>
                        }

                                <Link to={item.id} className="justify-left">View</Link>
                            </div>
                        })
                }
            </div>
        </div>
    )
}

export default TopVendorsCard