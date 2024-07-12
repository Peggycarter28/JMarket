const TopVendorsCard = ({title, items}) => {
    return(
    <div className="flex-1">
    <h5>{title}</h5>

    <div className="flex flex-wrap gap-8">
       { items.map((item, index) => {
            return <div key={index} className="w-[200px]">
                {/* Image Container */}
                <div className=" rounded-lg overflow-hidden"> 
                <img className="w-[200px] h-[120px] bg-green-600" src="/public/product.png"/>
                </div>

                {/* Title row */}
                <div className="flex flex-row space-between">
                    <div className="flex-10">
                    <h6>{item.title}</h6>
                    </div>

                    <div className="flex-2">
                        ({starRating}) <img src=""/>
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