import searchIcon from '../assets/search-normal.svg'
import locationIcon from '../assets/location.svg'
import star from '../assets/emojione_star.svg'
import vendorsNearYou from '../assets/mdi_location.svg'
import LeftsideBar from '../components/LandingPage/LeftSidebar'
import TopVendorsCard from '../components/LandingPage/TopVendorsCard'
import LandingFooter2 from '../components/Footer/LandingFooter'
import { useContext, useEffect, useState } from 'react'
import NavBarLandingComponent from '../components/NavBarLandingComponent'
import { UserContext } from '../context/AppContextt.jsx'
import axios from 'axios'
import { API_URL } from '../constants/config.js'
import Cookies from 'js-cookie'
import { getAllVendorsCategoryService, getVendorByGpsService } from '../service/vendorListingService.js'

function Home() {

    const [sorted, setSorted] = useState([])
    const [searchKey, setSearchKey] = useState(null)
    const [searchLGA, setSearchLga] = useState(null)
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(null)
    const [localGovernmentAreas, setLocalGovernmentAreas] = useState()

    const { user, setUser } = useContext(UserContext)

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });

    const handleSetSearchKey = (key) => {
        setSearchKey(key);
    }


    let debounceTimeout;

    const handleHomeSearch = () => {


        // Clear any previously set debounce timeout
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set a new debounce timeout with a delay of 300ms (or adjust as needed)
        debounceTimeout = setTimeout(() => {
            if (searchKey && items && items.length > 0) {
                console.log('Searching for:', searchKey);

                // Filter items based on partial string match
                const filtered = items.filter((item) => {
                    return (
                        item.name.toLowerCase().includes(searchKey.toLowerCase())
                        // || item.local_government.slug.toLowerCase().includes(searchLGA.toLowerCase())
                    );
                });

                console.log(filtered)

                // Set filtered results or clear sorted list if no matches
                setSorted(filtered.length > 0 ? filtered : []);
            }
        }, 300);  // Delay of 300ms
    };

    const handleVendorsNearMe = async () => {
        console.log(location)
        if (location.latitude && location.longitude) {
            const res = await getVendorByGpsService(location)
            console.log(res)
            if (res.status == 200 || res.status == 201) {
                const items = res.data
                setSorted(items)
            }
        }
        else {
            alert("Can't search, GPS cordinate not available")
        }
    }

    useEffect(() => {
        const getLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position.coords)
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude, error: null });
                    },
                    (error) => {
                        setLocation({ latitude: null, longitude: null, error: error.message });
                    }
                );

            } else {
                setLocation({ latitude: null, longitude: null, error: 'Geolocation is not supported by this browser.' });
            }
        };

        getLocation();
    }, []);


    useEffect(() => {

        document.title = "Bauchi Connect | Homepage"

        const storedItems = localStorage.getItem('items')

        console.log("Searching existing Data:", storedItems)

        if (storedItems) {
            setItems(JSON.parse(storedItems))
            setLoading(false)
        }
    }, [])



    useEffect(() => {
        const fetchUser = async () => {
            if (Cookies.get('token') !== null && (user.email == null || user.username == null)) {
                const userRes = await axios.get(`${API_URL}/api/auth/users/me/`, { headers: { "Authorization": `Token ${Cookies.get('token')}` } })
                if (userRes.status == 200 || userRes.status == 201) {
                    setUser(
                        prev => ({
                            ...prev,
                            token: Cookies.get('token'),
                            isLoggedIn: true,
                            username: userRes.data.username,
                            email: userRes.data.email,
                            id: userRes.data.id
                        })
                    )

                    localStorage.setItem('user', JSON.stringify(userRes.data))

                }
            }
            else {
                console.log("no token")
            }
        }

        const fetchCategories = async () => {

            const res = await getAllVendorsCategoryService() //Fix this and change to local government
            if (res.status == 200 || res.status == 201) {
                console.log(res.data)
                localStorage.setItem('localGovernmentAreas', JSON.stringify(res.data))

                setLocalGovernmentAreas(res.data)
            }
        }

        fetchUser()

        fetchCategories()
    }, [])


    return (
        <>
            <main className='min-h-screen'>
                <header className="h-screen p-4 md:h-[644px] w-full bg-header_image bg-cover m-0 top-0 flex justify-between py-8 items-center flex-col">
                    <NavBarLandingComponent />

                    <div className='flex-1 flex flex-col justify-center p-4 gap-8 items-center'>
                        <h1 className=" text-white font-semibold text-[26px] w-[80vw] text-center md:text-[48px] ">{user.lang == 'ha' ? "Sami diyawa, haduwa mafi kyau" : `Discover more, connect better`} </h1>

                        <p className='text-[#F2F2F2] text-[16px] md:text-[24px] font-normal text-center w-[80vw]'>
                            {user.lang == 'ha' ? "Bauchi Connect ke kawo abubuwa mafi kyau daga Bauchi zuwa garaku. Fara tafiyanka yanzu" : `Bauchi Connect Puts Bauchi’s Best at Your Fingertips. Your Story of Connection Begins Now!`}
                        </p>


                        {/* Search container */}
                        <div className="flex w-[90vw] md:w-auto flex-col md:flex-row gap-4">
                            <div className="h-[48px] w-full overflow-hidden md:w-[674px] bg-white border items-center flex rounded-full pl-3 pr-3">
                                <img src={searchIcon} className=" h-[24px] w-[24px] flex-initial" />

                                <div className="flex-1 md:flex-1" >
                                    <input className="pl-4 appearance-none outline-none"
                                        placeholder={user.lang == 'ha' ? "Me kake nema?" : `What are you looking for?`} onChange={(elem) => handleSetSearchKey(elem.target.value)} value={searchKey} />
                                </div>
                                <img src={locationIcon} className=" h-[24px] w-[24px] flex-initial" />
                                <div className="flex-1 md:flex-2 flex" >
                                    <select className="flex-1 md:flex-1 text-[#9caccb] outline-none appearance-none" placeholder="Location">
                                        <option value=""> {user.lang == 'ha' ? "Ina?" : `Location`}</option>
                                        {localGovernmentAreas.map(
                                            lga=>{
                                                return <option key={lga.slug} value={lga.slug}>{lga.name}</option>
                                            }
                                        )}
                                    </select>
                                </div>

                            </div>

                            <button onClick={handleHomeSearch} className="bg-[#EF6C00] h-[2rem] md:h-auto text-white rounded pl-4 pr-4 text-[16px] font-semibold">
                                {user.lang == 'ha' ? "Nema" : `Search`}
                            </button>
                        </div>

                        <button onClick={handleVendorsNearMe} className="bg-[#EF6C00] fixed right-0 bottom-0 me-[30px] mb-[30px] h-[2rem] md:h-auto text-white rounded pl-4 pr-4 p-2 text-[16px] font-semibold">
                            {user.lang == 'ha' ? "Mafi Kusa Dani" : `Vendors near me`}
                        </button>

                        <div className="flex gap-4 md:gap-8">
                            <div className='w-[96px] h-[98px] flex flex-col items-center justify-start'>
                                <div className="bg-white p-2 w-[56px] h-[56px] rounded-full">
                                    <img src={star} />
                                </div>
                                <p className='text-[#808080] text-[14px] md:text-[16px] font-semibold'> {user.lang == 'ha' ? "Masu Aiki" : `Top Vendors`}</p>
                            </div>

                            {/* <div className='w-[96px] h-[150px] flex flex-col items-center justify-start'>
                                <div className="bg-white p-2 w-[56px] h-[56px] rounded-full">
                                    <img className='mt-3' src={CAC} />
                                </div>
                                <p className='text-[#808080] text-[14px] md:text-[16px] text-center font-semibold w-[80px] flex flex-wrap'>
                                {user.lang == 'ha' ? "Masu CAC" : `CAC Verified Vendors`}</p>
                                    
                            </div> */}

                            <div className='w-[96px] h-[150px] flex flex-col items-center justify-start'>
                                <div className="bg-white p-2 w-[56px] h-[56px] rounded-full">
                                    <img src={vendorsNearYou} />
                                </div>
                                <p className='text-[#808080] text-[14px] md:text-[16px] text-center font-semibold'>
                                    {user.lang == 'ha' ? "Mafi kusa dani" : `Vendors near you`}
                                </p>
                            </div>

                        </div>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row px-2 md:px-10 py-4">

                    <LeftsideBar />

                    <TopVendorsCard preData={sorted} title={"Top Vendors"} />

                </div>

                <p>{location.latitude} {location.longitude}</p>


            </main>
            <LandingFooter2 />
        </>
    )
}

export default Home