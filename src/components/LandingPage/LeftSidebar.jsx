import SidebarItem from "./SidebarItem"

const LeftsideBar = () => {
    const items = [
        {img: "./service-icons/vehicles.svg", name:"Vehicles", count:699},
        {img: "./service-icons/property.svg", name:"Properties", count:699},
        {img: "./service-icons/mobile.svg", name:"Mobile Phones", count:699},
        {img: "", name:"Electronics", count:699},
        {img: "", name:"Beauty", count:699}
    ]
    return(
        <aside className="w-[20vw]  mr-4 p-4 h-screen bg-[#F5F5F5] border border-[#EBEBEB] rounded-lg">
            {items.map((item, index)=>{
                return <SidebarItem key={index} itemObject={item} />
            })}
        </aside>
    )
}
export default LeftsideBar