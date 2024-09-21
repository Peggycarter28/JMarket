import { Link, useParams } from "react-router-dom"
import NavBarComponent from "../../components/NavBarComponent"
import vendorImage from "/vendor_images/cover-one.png"
import GrayContainer from "../../components/Layout/GrayContainer"
import WhiteInGrayContainer from "../../components/Layout/WhiteInGrayContainer"
import LandingFooter2 from "../../components/Footer/LandingFooter"
import CTAButton from "../../components/Forms/Buttons/CTAButton"
import ReviewCard from "../../components/Services/ReviewCard"
import { useContext, useEffect, useState } from "react"
import { getVendorByIdService } from "../../service/vendorListingService"
import { UserContext } from "../../context/AppContextt"
import ReviewsComponent from "./ReviewsComponent"
import PaymentModal from "../../components/Modals/PaymentModal"
import axios from "axios"
import Cookies from 'js-cookie'
import { API_URL } from "../../constants/config"

import SubmitReview from "./SubmitReview"
import MessageVendorButton from "./MessageVendorButton"
import ReviewPhotoGallery from "./ReviewPhotoGallery.jsx"
import { RecetlyViwedItems } from "../../helpers/RecentlyViewed.js"
import MapComponent from "./Map.jsx"

const Vendors = () => {

    const { user, setUser } = useContext(UserContext)

    const { category, title } = useParams()

    const [item, setItem] = useState([])

    const [fetchedUser, setFetchedUser] = useState(null)

    const [showModal, setShowModal] = useState(false)

    // Usage
    const recentlyViwed = new RecetlyViwedItems();



    useEffect(() => {
        console.log("Viewing single Vendor")

        const fetch = async () => {

            const res = await getVendorByIdService(title)

            if (res.status == 200 || res.status == 201) {

                console.log(res.data)

                setItem(res.data)
                // Adding items

                const lastViwed = recentlyViwed.getItems()

                console.log("Last views are:", lastViwed)

                if (lastViwed.length > 0) {
                    const lastViewedItem = lastViwed[lastViwed.length - 1]


                    if (lastViewedItem?.name == res.data.name) {
                        //Do nothing. We are still viwing the last viewed item
                        console.log("Recently viewed still the same: ", res.data)
                    }
                    else {
                        // We are viewing a new item, proceed to add
                        recentlyViwed.add(res.data)
                        console.log("Recently viewed added: ", res.data)
                    }
                }

                else {
                    console.log("First Item viewed by this you")
                }

            }
            else { alert("Unable to fetch vendor") }
        }

        fetch()

    }, [])

    const handleProcessOrder = () => {
        //    Show modal
        setShowModal(!showModal)

    }

    useEffect(() => {
        const fetchUser = async () => {
            if (Cookies.get('token') !== null && (user.email == null || user.username == null)) {
                const userRes = await axios.get(`${API_URL}/api/auth/users/me/`, { headers: { "Authorization": `Token ${Cookies.get('token')}` } })

                if (userRes.status == 200 || userRes.status == 201) {
                    console.log(userRes.data)

                    console.log(user)

                    console.log(Cookies.get('token'))



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

                    setFetchedUser(userRes.data)

                    localStorage.setItem('user', JSON.stringify(userRes.data))

                }
            }
            else {
                console.log("no token")
            }
        }

        const storedUser = localStorage.getItem('user')

        if (storedUser) {
            setFetchedUser(JSON.parse(storedUser))
            fetchUser()
        }

        fetchUser()
    }, [])



    return (
        <>
            <div className="absolute w-full min-h-screen">
                <header>
                  <div className="flex flex-col gap-8 p-3">
                  <NavBarComponent />
                    {/* Vendor cover image */}
                    <div className="h-auto md:h-[480px] w-full  overflow-hidden bg-[gray] flex justify-center">
                        <img src={item?.image_url} className="" />
                    </div>
                  </div>
                </header>

                <div className="relative p-8 px-2 md:px-[136px] flex flex-col md:flex-row gap-4">

                    {/* First Column */}
                    <div className="flex-[8] ">

                        <div className="text[12px] font-regular leading-[14.52px] text-[#808080]">
                            {
                                user.lang == 'ha'
                                    ? `Kategori - `
                                    : `Category - `
                            }{category}
                        </div>

                        <div className="fw-[600] text-[#464B4F] text-[24px] md:text-[48px] leading-[58.09px] flex gap-4 align-end">{item.name}

                            <div className="flex-2 flex gap-1 items-center text-[#808080] text-[16px]">
                                ({item?.rating}) <img className="size-[16px]" src="/vendors-star.svg" />
                            </div>
                        </div>

                        {/*  */}
                        <div className="text-[24px] text-[#808080] flex gap-1 items-center">
                            <img className="size-[24px]" src="/vendors-location.svg" /> {item?.local_government?.name}
                        </div>

                        {/*  */}
                        <div  className="flex gap-4 justify-start mb-[30px]">
                            {item.id && <MessageVendorButton  listing_id={item?.id} receiver_id={item?.owner.id} />}

                            <div className="cursor-pointer" onClick={handleProcessOrder}>
                                <CTAButton iconBtnUrl="/message-text.svg" isIconBtn={false} title={user.lang == 'ha' ? `Order Yanzu` : `Order Now`} />
                            </div>
                        </div>

                        <GrayContainer>
                            
                            <WhiteInGrayContainer>
                                <div>
                                    <h5 className="text-[#484848] leading-[19.36px]">
                                        {user.lang == 'ha' ? `Bayanin Aiki` : `Vendor Description`}
                                    </h5>
                                    {
                                        user.lang == 'ha'
                                            ? <p className="text-[#808080] text-[14px] leading-[20px]">{item?.description_ha}</p>
                                            : <p className="text-[#808080] text-[14px] leading-[20px]">{item?.description}</p>
                                    }
                                </div>
                            </WhiteInGrayContainer>

                            <WhiteInGrayContainer>
                                <h5>
                                    {user.lang == 'ha' ? `Lokacin bude` : `Opening time`}
                                </h5>
                                <p className="text-sm font-semibold">Mon-Fri 09:00–16:00</p>
                                <p className="text-sm font-semibold">Saturday (Only Appointments)</p>
                            </WhiteInGrayContainer>

                            

                            <SubmitReview listing_id={item?.id} />

                            <WhiteInGrayContainer>
                                <p className="text-[#808080] text-[14px] leading-[20px]">BauchiConnect Directory/ Find A Vendor section is NOT an endorsement of any
                                    of the vendors listed. It is simply for informationational purposes.
                                    BauchiConnect and its affiliates will not be liable for any losses, injuries or
                                    damages that may arise in the relationship between an individual, group or
                                    organization and any of the vendors listed.</p>
                            </WhiteInGrayContainer>
                        </GrayContainer>

                    </div>

                    {/* Right Column */}
                    <div className="flex-[4]">
                        <GrayContainer rounded={true}>
                            <div className="p-4">
                                <ReviewPhotoGallery />

                                <WhiteInGrayContainer>
                                    <div className="text-center">
                                        {user.lang == 'ha' ? "Rubuta bita" : "Write a review"}
                                    </div>
                                </WhiteInGrayContainer>
                            </div>
                        </GrayContainer>

                        <ReviewsComponent />
                    </div>
                    {/* Right Column Ends */}
                </div>


                <LandingFooter2 />
            </div>
            {showModal &&
                <PaymentModal service_creator={item.owner.id} fetchedUser={fetchedUser} amount={item.service_charge} service_id={item.id} handleModal={handleProcessOrder} />
            }
        </>
    )
}

export default Vendors