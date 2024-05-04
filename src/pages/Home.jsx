import searchIcon from '../assets/search-normal.svg'
import locationIcon from '../assets/location.svg'
import star from '../assets/emojione_star.svg'
import CAC from '../assets/CAC.svg'
import vendorsNearYou from '../assets/mdi_location.svg'
import NavBar from '../components/LandingPage/NavBar'
import ProductWithLeftSideBar from '../components/Layout/ProductWithLeftSidebar'
import LeftsideBar from '../components/LandingPage/LeftSidebar'
import TopVendorsCard from '../components/LandingPage/TopVendorsCard'


function Home() {

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
            <header className="h-[476px] w-100 bg-header_image bg-cover m-0 top-0 flex justify-around items-center flex-col">
                <NavBar links={[
                    { name: "Find Vendors", url: "" },
                    { name: "Vendors", url: "" },
                    { name: "Sign In", url: "" },
                    { name: "Sign Up", url: "" },
                ]} />
                <h1 className=" text-red-600 font-[48px] ">Discover more, connect better </h1>
                <p>Bauchi Connect Puts Bauchi’s Best at Your Fingertips. Your Story of Connection Begins Now! </p>

                <div className="flex gap-4">
                    <div className="h-[48px] w-[674px] bg-white border items-center flex rounded-full pl-3 pr-3">
                        <img src={searchIcon} className=" h-[24px] w-[24px] flex-initial" />

                        <div className="flex-1" >
                            <input className="pl-4 w-full appearance-none outline-none"
                                placeholder="What are you looking for?" />
                        </div>
                        <img src={locationIcon} className=" h-[24px] w-[24px] flex-initial" />
                        <input className="flex-2 outline-none appearance-none" placeholder="Location" />

                    </div>
                    <button className="bg-[orange] pl-4 pr-4">Search</button>
                </div>
                <div className="flex gap-8">
                    <div className="bg-white p-2 rounded-full">
                        <img src={star} />
                    </div>
                    <div className="bg-white p-2 rounded-full items-center justify-center pt-5">
                        <img src={CAC} />
                    </div>



                    <div className="bg-white p-2 rounded-full">
                        <img src={vendorsNearYou} />
                    </div>
                </div>
            </header>

            <ProductWithLeftSideBar>
                <LeftsideBar />

                <TopVendorsCard title={"Top Vendors"} items={items} />

            </ProductWithLeftSideBar>
        </main>

    )
}

export default Home