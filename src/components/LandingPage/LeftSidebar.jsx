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
        <aside className="w-full md:w-[20vw] gap-4 md:gap-none overflow-auto flex md:flex-col mr-none md:mr-4 p-4 h-[90px] md:h-screen md:bg-[#F5F5F5] border border-[#EBEBEB] rounded-lg">
           <div className="flex md:flex-col gap-4 md:gap-1">
            {items.map((item, index)=>{
                return <SidebarItem key={index} itemObject={item} />
            })}
            </div>
        </aside>
           )
}
export default LeftsideBar