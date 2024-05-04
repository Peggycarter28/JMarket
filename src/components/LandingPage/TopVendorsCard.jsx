const TopVendorsCard = ({title, items}) => {
    return(
    <div className="flex-1">
    <h5>{title}</h5>

    <div className="flex flex-wrap gap-8">
       { items.map((item, index) => {
            return <div key={index} className="w-[200px]">
                <img className="w-[200px] h-[120px] bg-green-600" src=""/>
                <h6>{item.title}</h6>
                <p>{item.description}</p>
            </div>
        })
    }
    </div>
    </div>
)
}

export default TopVendorsCard