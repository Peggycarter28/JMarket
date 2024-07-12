import SidebarItem from "../LandingPage/SidebarItem"


const AdminNavBar = () => {
    const items = [
        {img: "", name:"Vehicles", count:699},
        {img: "", name:"Properties", count:699},
        {img: "", name:"Mobile Phones", count:699},
        {img: "", name:"Electronics", count:699},
        {img: "", name:"Beauty", count:699}
    ]
    return(
        <aside className="w-[20vw] fixed  mr-4 p-4 h-screen bg-[#F5F5F5] border border-[#EBEBEB]">
            {items.map((item, index)=>{
                return <SidebarItem itemObject={item} />
            })}
        </aside>
    )
}
export default AdminNavBar