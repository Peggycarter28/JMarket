const TopVendorsCard = ({ title, items, starRating = 1 }) => {
    return (
        <div className="flex-1">
            <h5>
                {title}
            </h5>

            <div className="flex flex-wrap gap-8">
                {items.map((item, index) => {
                    return <div key={index} className="w-[200px]">
                        {/* Image Container */}
                        <div className=" rounded-lg overflow-hidden">
                            <img className="w-[200px] h-[120px] bg-green-600" src="./public/product.png" />
                        </div>
        

                        {/* Title row */}
                        <div className="flex flex-row justify-between">
                            <div className="flex-10">
                                <h3 className="font-bold">{item.title}</h3>
                            </div>
                            <div className="flex-2">
                                ({starRating}) <img src="./public/" />
                            </div>
                        </div>
                        <p>{item.description}</p>
                    </div>
                })
                }
            </div>
        </div>
    )
}

export default TopVendorsCard