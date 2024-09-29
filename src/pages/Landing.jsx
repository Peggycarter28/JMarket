import React, { useContext, useEffect, useState } from 'react';
import TopVendorsCard from '../components/LandingPage/TopVendorsCard';
import GrayContainer from '../components/Layout/GrayContainer';
import WhiteInGrayContainer from '../components/Layout/WhiteInGrayContainer';
import NavBarComponent from '../components/NavBarComponent';
import { getVendorCategoriesService } from '../service/vendorListingService';
import { UserContext } from '../context/AppContextt';
import { Link } from 'react-router-dom';
import LandingFooter2 from '../components/Footer/LandingFooter';
import Cookies from 'js-cookie'
import axios from 'axios';
import { API_URL } from '../constants/config';

const EcommercePage = () => {
    const name = "leftsidebar";

    const { user, setUser } = useContext(UserContext) 
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState([]);
    const [loaded, setLoaded] = useState(false); // Start as false until loading is done
    const [offlineFound, setOfflineFound] = useState(false);

    useEffect(() => {
        console.log("Viewing categories");

        const storedCategories = localStorage.getItem("categories");

        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
            setOfflineFound(true);
            setLoaded(true)
        }
    }, [name]);


    useEffect(() => {
        const fetch = async () => {
            
            const res = await getVendorCategoriesService();

            if (res.status === 200 || res.status === 201) {
                setCategories(res.data);
                localStorage.setItem("categories", JSON.stringify(res.data));
                setLoaded(true);
                setOfflineFound(true);
            } else {
                alert("Unable to fetch categories");
                setLoaded(true);
            }

            const cartRes = await getVendorCategoriesService();

            if (res.status === 200 || res.status === 201) {
                setCart(res.data);
                localStorage.setItem("cart", JSON.stringify(res.data));
                setLoaded(true);
                setOfflineFound(true);
            } else {
                alert("Unable to fetch Cart Items");
                setLoaded(true);
            }
        };

        fetch();
    }, []);


    useEffect(() => {
        console.log("Authenticating User")
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
                    console.log(userRes.data)

                }
            }
            else {
                console.log("Not Successful")
                
                setUser(
                    prev => ({
                        ...prev,
                        token: Cookies.get('token'),
                        isLoggedIn: false,
                        username: null,
                        email: null,
                        id: null
                    })
                )

                localStorage.removeItem('user')
                console.log("no token")
            }
        }

        fetchUser()
    }, []
    )
    return (
        <GrayContainer>
            <div className="w-full">
                {/* Navigation Bar */}
                <WhiteInGrayContainer>
                    <NavBarComponent />
                </WhiteInGrayContainer>

                {/* Main Section */}

                <div className="flex flex-col md:flex-row mt-4 gap-2 md:mx-[100px] mt-[80px]">
                    {/* Categories Column */}

                    <div className="w-full md:w-2/12 space-y-4 md:h-[390px] overflow-y-auto">
                        <WhiteInGrayContainer rounded={true}>
                            <ul className='flex flex-row gap-8 md:gap-2 items-center md:items-start md:flex-col'>
                                {categories.map((item, i) => {
                                    return (
                                        <li key={i} className='p-[6px]'>
                                            <Link className='flex items-center gap-2' to={`/search/category/${item.id}`}>
                                                <img src={item.image_url} className='size-[25px]' />
                                                <span>
                                                {user.lang == "ha" ? item?.name_ha
                                                    : item?.name
                                                }
                                                </span>
                                            </Link>
                                        </li>)
                                })}
                            </ul>
                        </WhiteInGrayContainer>
                    </div>
                    {/* Carousel Column */}
                    <div className="md:w-8/12 h-96 relative">
                        {/* Carousel Image */}
                        <img
                            src="/landing-page/slider-1.png"
                            alt="carousel"
                            className="w-full h-full object-cover"
                        />
                        {/* Image Overlay */}
                        <div className="absolute top-4 left-4">
                            <h2 className="text-4xl text-slate-100 font-bold">{user.lang == "en" ? "Explore great services in bauchi" : "Ku zo ku ga abubuwa dabam dabam daga jihar Bauchi"}</h2>
                            <button className="mt-2 px-4 py-2 bg-slate-100 text-slate-950 rounded-lg">{user.lang == "ha" ? "Bude sabon Akaunt" : "Sign Up"}</button>
                        </div>
                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
                            <span className="h-3 w-3 bg-slate-100 rounded-full"></span>
                            <span className="h-3 w-3 bg-slate-200 rounded-full"></span>
                            <span className="h-3 w-3 bg-slate-300 rounded-full"></span>
                            <span className="h-3 w-3 bg-slate-400 rounded-full"></span>
                            <span className="h-3 w-3 bg-slate-500 rounded-full"></span>
                            <span className="h-3 w-3 bg-slate-600 rounded-full"></span>
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div className="w-2/12 hidden md:flex flex-col space-y-4">
                        <div className="flex flex-col justify-center items-center h-48">
                            <WhiteInGrayContainer rounded={true}>
                                <div className="flex items-center space-x-2">
                                    <img className="w-full h-full object-cover" src="/landing-page/zzzz.png" alt="Ads 2" />
                                </div>
                            </WhiteInGrayContainer>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-gray-200 h-48">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/landing-page/ads-1.png"
                                    alt="carousel"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Containers */}
                <div className="grid md:grid-cols-6 gap-4 mt-4 md:mx-[100px] cursor-pointer">
                    {[{ name: 'Buy Now', src: "/landing-page/masa2.jpg", link: '/search/category/5' }, { name: 'New Vendors', src: "/landing-page/new-arrival.png", link: '/search/category/2' }, { name: 'Shop Local', src: "/landing-page/market.jpg", link: '/search/category/1' }, { name: 'Electronics', src: "/landing-page/ds.jpg", link: '/search/category/3'  }, { name: 'Top Vendors', src: "/landing-page/unnamed (1).jpg", link: '/search/category/6' }, { name: 'Special Offers', src: "/landing-page/lcmrk.jpg", link: '/search/category/7' }].map((item, index) => (
                        <Link key={index} to={item.link} className="relative h-56 hover:bg-slate-300 duration-300">
                            <img
                                src={item.src}
                                alt={item.name}
                                className="w-full h-44 object-cover"
                            />
                            <div className=" bottom-2 left-2 text-black text-center px-2 py-1 rounded-lg">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='md:mx-[100px]'>
                <TopVendorsCard cart={cart} preData={[]} title={"All Vendors"} />
            </div>

            {/* <div className='mx-[100px]'>
                <TopVendorsCard preData={[]} title={"Vehicle Vendors"} />
            </div> */}

            <LandingFooter2 />
        </GrayContainer>
    );
};

export default EcommercePage;
