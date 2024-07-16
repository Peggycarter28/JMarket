const SidebarItem = ({itemObject}) => {
    return(
    <div className="flex gap-4 py-2">
        <img className="w-[50px] h-[50px] rounded-full bg-white" src={itemObject.img}/>
        <div>
            <h4 className=" font-bold text-[#464B4F] text-[16px] leading-[19.36px]">{itemObject.name}</h4>
            <p className="text-[#808080] text-[14px]">{itemObject.count} Vendors</p>
        </div>
    </div>
    )
}
export default SidebarItem