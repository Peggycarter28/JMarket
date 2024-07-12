import SidebarItem from "../LandingPage/SidebarItem"


const AgentSideBar = () => {
    const items = [
        {img: "", name:"Vehicles", count:699},
        {img: "", name:"Properties", count:699},
        {img: "", name:"Mobile Phones", count:699},
        {img: "", name:"Electronics", count:699},
        {img: "", name:"Beauty", count:699}
    ]
    return(
        <aside className="w-[20vw] h-[200px] mr-4 p-4 mt-10 box-content bg-[#F5F5F5] ">
            {/* {items.map((item, index)=>{
                return <SidebarItem itemObject={item} />
            })} */}
        </aside>
    )
}
export default AgentSideBar