import React, { useContext, useEffect, useState } from 'react';
import TopVendorsCard from '../components/LandingPage/TopVendorsCard';
import GrayContainer from '../components/Layout/GrayContainer';
import WhiteInGrayContainer from '../components/Layout/WhiteInGrayContainer';
import NavBarLandingComponent from '../components/NavBarLandingComponent';
import NavBarComponent from '../components/NavBarComponent';
import LeftsideBar from '../components/LandingPage/LeftSidebar';
import { getVendorCategoriesService } from '../service/vendorListingService';
import { UserContext } from '../context/AppContextt';
import { Link } from 'react-router-dom';
import LandingFooter2 from '../components/Footer/LandingFooter';

const EcommercePage = () => {
    const name = "leftsidebar";

    const { user, setUser } = useContext(UserContext)
    const [categories, setCategories] = useState([]);
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
        };

        fetch();
    }, []);
    return (
        <GrayContainer>
            <div className="w-full">
                {/* Navigation Bar */}
                <WhiteInGrayContainer>
                    <NavBarComponent />
                </WhiteInGrayContainer>

                {/* Main Section */}

                <div className="flex mt-4 gap-2 mx-[100px]">
                    {/* Categories Column */}

                    <div className="w-2/12 space-y-4 h-[390px] overflow-y-auto">
                        <WhiteInGrayContainer rounded={true}>
                            <ul>
                                {categories.map((item) => {
                                    return (
                                        <li className='p-[6px]'>
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
                    <div className="w-8/12 h-96 relative">
                        {/* Carousel Image */}
                        <img
                            src="/landing-page/slider-1.png"
                            alt="carousel"
                            className="w-full h-full object-cover"
                        />
                        {/* Image Overlay */}
                        <div className="absolute top-4 left-4">
                            <h2 className="text-4xl text-white font-bold">Explore great services in bauchi</h2>
                            <button className="mt-2 px-4 py-2 bg-white text-black rounded-lg">Sign Up</button>
                        </div>
                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
                            <span className="h-3 w-3 bg-white rounded-full"></span>
                            <span className="h-3 w-3 bg-white rounded-full"></span>
                            <span className="h-3 w-3 bg-white rounded-full"></span>
                            <span className="h-3 w-3 bg-white rounded-full"></span>
                            <span className="h-3 w-3 bg-white rounded-full"></span>
                            <span className="h-3 w-3 bg-white rounded-full"></span>
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div className="w-2/12 flex flex-col space-y-4">
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
                <div className="grid grid-cols-6 gap-4 mt-4 mx-[100px]">
                    {[{ name: 'Clearance Sales', src: "/landing-page/masa2.jpg" }, { name: 'New Arrivals', src: "/landing-page/new-arrival.png" }, { name: 'Appliance', src: "/landing-page/market.jpg" }, { name: 'Electronics', src: "/landing-page/makeup.jpg" }, { name: 'Gadgets', src: "/landing-page/unnamed (1).jpg" }, { name: 'Special Offers', src: "/landing-page/lcmrk.jpg" }].map((item, index) => (
                        <div key={index} className="relative h-56">
                            <img
                                src={item.src}
                                alt={item.name}
                                className="w-full h-44 object-cover"
                            />
                            <div className=" bottom-2 left-2 text-black text-center px-2 py-1 rounded-lg">
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mx-[100px]'>
                <TopVendorsCard preData={[]} title={"All Vendors"} />
            </div>

            {/* <div className='mx-[100px]'>
                <TopVendorsCard preData={[]} title={"Vehicle Vendors"} />
            </div> */}

            <LandingFooter2 />
        </GrayContainer>
    );
};

export default EcommercePage;
