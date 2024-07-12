import searchIcon from '../assets/search-normal.svg'
import locationIcon from '../assets/location.svg'
import star from '../assets/emojione_star.svg'
import CAC from '../assets/CAC.svg'
import vendorsNearYou from '../assets/mdi_location.svg'
import NavBar from '../components/LandingPage/NavBar'
import ProductWithLeftSideBar from '../components/Layout/ProductWithLeftSidebar'
import LeftsideBar from '../components/LandingPage/LeftSidebar'
import TopVendorsCard from '../components/LandingPage/TopVendorsCard'
import AgentSideBar from '../components/Agents/agent_side_bar'
import AdminWithLeftNavBar from '../components/Layout/AdminWithLeftNavBar'
import AdminNavBar from '../components/Agents/NavBar'



function Agent() {

    const items = [
        { title: "Bam's Food Clinic", description: "lorem description is a description of some words that are into a group of words for the day" },
        { title: "Hello world", description: "lorem description is a description of some words that are into a group of words for the day. So that" },
        { title: "Bam's Food Clinic", description: "lorem description is a description of some words that are into a group of words for the day" },
        { title: "Bam's Food Clinic", description: "lorem description is a description of some words that are into a group of words for the day" },
        { title: "Bam's Food Clinic", description: "lorem description is a description of some words that are into a group of words for the day" },
        { title: "Bam's Food Clinic", description: "lorem description is a description of some words that are into a group of words for the day" }
    ]
    return (
        <main>
            
               

            <AdminWithLeftNavBar>
                <AdminNavBar />

                <main class="flex-1 ml-[20vw] px-6 pt-10 ">
                {/* <NavBar links={[
                    { name: "Find Vendors", url: "" },
                    { name: "Vendors", url: "" },
                    { name: "Sign In", url: "" },
                    { name: "Sign Up", url: "" },
                ]} /> */}
                <h2 className='pb-8 font-bold text-[#ccc]'>New Product Collection</h2>
                    <fieldset className='mb-4 w-[100%]'>
                        <label className='absolute mt-[-12px] ml-[5px] bg-white text-sm font-bold' htmlFor="">Item Name: </label>
                        <input className="border border-[#a5a5a5] p-1 w-2/3" type="text" />
                    </fieldset>
                  

                    <fieldset className='mb-4'>
                        <label className='absolute mt-[-12px] ml-[5px] bg-white text-sm font-bold' htmlFor="">Category: </label>
                        <select className="border border-[#a5a5a5] p-1 w-2/3" type="text">
                            <option value="">Phones</option>
                            <option value="">Tevision</option>
                            <option value="">DVDs</option>
                            </select>
                    </fieldset>

                    <fieldset className='mb-4'>
                        <label className='absolute mt-[-12px] ml-[5px] bg-white text-sm font-bold' htmlFor="">Quantity: </label>
                        <input className="border border-[#a5a5a5] p-1 w-2/3" type="text" />
                    </fieldset>
                </main>
                
            <AgentSideBar />

            </AdminWithLeftNavBar>
        </main>

    )
}

export default Agent