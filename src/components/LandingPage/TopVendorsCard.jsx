import { Link } from "react-router-dom"

const TopVendorsCard = ({ title, items, starRating = 1 }) => {

    return (
        <div className="flex-1">
            <h5>
                {title}
            </h5>

            <div className="flex flex-wrap gap-8">
                {items.map((item, index) => {
                    return <div key={index} className="w-[200px] border rounded-lg p-2">
                        {/* Image Container */}
                        <Link to={item.url}>
                            <div className=" rounded-lg overflow-hidden">
                                <img className="w-[200px] h-[120px] bg-green-600" src="./product.png" />
                            </div>
                        </Link>

                        {/* Title row */}

                        <div className="flex flex-row justify-between">
                            <Link to={item.url}>
                                <div className="flex-10">
                                    <h3 className="font-bold text-[16px] text-[#464B4F]">{item.title}</h3>
                                </div>
                            </Link>
                            <div className="flex-2 flex gap-1 items-start">
                                <div className="flex-2 flex gap-1 items-center text-[#808080] text-[12px]">
                                    ({starRating}) <img className="w-[12px] h-[12px]" src="./vendors-star.svg" />
                                </div>
                            </div>
                        </div>
                        <div className="text-[12px] text-[#808080] flex gap-1 items-center">
                            <img className="w-[12px] h-[12px]" src="./vendors-location.svg" /> Bauchi
                        </div>
                        <p className="text-[#808080] text-[12px]">{item.description}</p>


                        <Link to={""} className="justify-left">View</Link>
                    </div>
                })
                }
            </div>
        </div>
    )
}

export default TopVendorsCard