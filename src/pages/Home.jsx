import searchIcon from '../assets/search-normal.svg'
import locationIcon from '../assets/location.svg'
import star from '../assets/emojione_star.svg'
import CAC from '../assets/CAC.svg'
import vendorsNearYou from '../assets/mdi_location.svg'
import ProductWithLeftSideBar from '../components/Layout/ProductWithLeftSidebar'
import LeftsideBar from '../components/LandingPage/LeftSidebar'
import TopVendorsCard from '../components/LandingPage/TopVendorsCard'
import LandingFooter2 from '../components/Footer/LandingFooter'
import { useEffect } from 'react'
import NavBarComponent from '../components/NavBarComponent'

function Home() {

    const items = [
        { title: "Bee's Kitchen", description: "Test description", url: "service/food/bees-kitchen-bauchi" },
        { title: "CO electrical services", description: "Test description", url: "service/electrical services/co-electrical-bauchi" },
        { title: "Mees Laundry services", description: "Test description", url: "service/laundry/mees-laundry" },
        { title: "Umar Bash Car hire services", description: "Test description", url: "service/automobile/umar-bash-car-hire-services" },
        { title: "BAC painters", description: "Test description", url: "service/interior decor/bac-painters" },
        { title: "Musty logistics", description: "Test description", url: "service/transport/m-logistics" }
    ]

    useEffect(
        () => {
            document.title = "Bauchi Connect | Homepage"
        }, []
    )
    return (
        <>
            <main>
                <header className="h-[644px] w-100 bg-header_image bg-cover m-0 top-0 flex justify-between py-8 items-center flex-col">
                    <NavBarComponent/>

                    <div className='flex-1 flex flex-col justify-center p-4 gap-8 items-center'>
                        <h1 className=" text-white font-semibold text-[48px] ">Discover more, connect better </h1>
                        <p className='text-[#F2F2F2] text-[24px] font-normal'>Bauchi Connect Puts Bauchi’s Best at Your Fingertips. Your Story of Connection Begins Now! </p>

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
                            <button className="bg-[#EF6C00] text-white rounded pl-4 pr-4 text-[16px] font-semibold">Search</button>
                        </div>
                        
                        <div className="flex gap-8">
                            <div className='w-[96px] h-[98px] flex flex-col items-center justify-start'>
                                <div className="bg-white p-2 w-[56px] h-[56px] rounded-full">
                                    <img src={star} />
                                </div>
                                <p className='text-[#808080] text-[16px] font-semibold'>Top Vendors</p>
                            </div>


                            <div className='w-[96px] h-[150px] flex flex-col items-center justify-start'>
                                <div className="bg-white p-2 w-[56px] h-[56px] rounded-full">
                                    <img src={CAC} />
                                </div>
                                <p className='text-[#808080] text-[16px] font-semibold'>CAC <br /> Verified <br />Vendors</p>
                            </div>

                            <div className='w-[96px] h-[150px] flex flex-col items-center justify-start'>
                                <div className="bg-white p-2 w-[56px] h-[56px] rounded-full">
                                    <img src={vendorsNearYou} />
                                </div>
                                <p className='text-[#808080] text-[16px] font-semibold'>Vendors <br /> near <br />you</p>
                            </div>

                        </div>
                    </div>
                </header>

                <div className="flex flex-row px-10 py-4">

                    <LeftsideBar />
                    <TopVendorsCard title={"Top Vendors"} items={items} />

                </div>
            </main>
            <LandingFooter2 />
        </>
    )
}

export default Home