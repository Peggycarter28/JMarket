import searchIcon from '../assets/search-normal.svg'
import locationIcon from '../assets/location.svg'
import star from '../assets/emojione_star.svg'
import CAC from '../assets/CAC.svg'
import vendorsNearYou from '../assets/mdi_location.svg'
import ProductWithLeftSideBar from '../components/Layout/ProductWithLeftSidebar'
import LeftsideBar from '../components/LandingPage/LeftSidebar'
import TopVendorsCard from '../components/LandingPage/TopVendorsCard'
import LandingFooter2 from '../components/Footer/LandingFooter'
import { useContext, useEffect, useState } from 'react'
import NavBarComponent from '../components/NavBarComponent'
import NavBarLandingComponent from '../components/NavBarLandingComponent'
import { UserContext } from '../context/AppContextt.jsx'
import axios from 'axios'
import { API_URL } from '../constants/config.js'
import Cookies from 'js-cookie'

function Home() {

   const {user, setUser} = useContext(UserContext)

   const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
});

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
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


    useEffect(
        () => {
            document.title = "Bauchi Connect | Homepage"

            getLocation();
            console.log(location)
        }, []
    )

    useEffect(()=>{
        const fetchUser = async ()=> {
           if( Cookies.get('token') !== null && (user.email == null || user.username == null ))
           {
            const userRes = await axios.get(`${API_URL}/api/auth/users/me/`,{headers: {"Authorization": `Token ${Cookies.get('token')}`}})
            if(userRes.status == 200 || userRes.status == 201)
            {
                setUser(
                    prev => ({...prev,
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
           else{
            console.log("no token")
           }
        }

        const fetchCategories = async ()=> {
            
             const userRes = await axios.get(`${API_URL}/api/category`) //Fix this and change to local government
             if(userRes.status == 200 || userRes.status == 201)
             {
 
             localStorage.setItem('localGovernmentAreas', JSON.stringify(userRes.data))
             
             }
            }

        fetchUser()

        fetchCategories()
    }, [])


    return (
        <>
            <main className='min-h-screen'>
                <header className="h-screen p-4 md:h-[644px] w-full bg-header_image bg-cover m-0 top-0 flex justify-between py-8 items-center flex-col">
                    <NavBarLandingComponent/>

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
                                        placeholder={user.lang =='ha' ? "Me kake nema?": `What are you looking for?`} />
                                </div>
                                <img src={locationIcon} className=" h-[24px] w-[24px] flex-initial" />
                                <div className="flex-1 md:flex-2 flex" >
                                    <select className="flex-1 md:flex-1 text-[#9caccb] outline-none appearance-none" placeholder="Location">
                                        <option value=""> {user.lang == 'ha' ? "Ina?" : `Location`}</option>
                                        <option value="">Bogoro</option>
                                    </select>
                                </div>

                            </div>

                            <button className="bg-[#EF6C00] h-[2rem] md:h-auto text-white rounded pl-4 pr-4 text-[16px] font-semibold">
                                {user.lang == 'ha' ? "Nema" : `Search`}
                                </button>
                        </div>

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
                    
                    <TopVendorsCard title={"Top Vendors"} />

                </div>
            </main>
            <LandingFooter2 />
        </>
    )
}

export default Home