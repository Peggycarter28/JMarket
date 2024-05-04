const SidebarItem = ({itemObject}) => {
    return(
    <div className="flex gap-4 py-2">
        <img className="w-[50px] h-[50px] rounded-full bg-white" src={itemObject.img}/>
        <div>
            <h4 className=" font-bold text-[#464B4F]">{itemObject.name}</h4>
            <p className="text-[#808080]">{itemObject.count} Vendors</p>
        </div>
    </div>
    )
}
export default SidebarItem