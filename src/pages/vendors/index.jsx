import { Link, useParams } from "react-router-dom"
import NavBarComponent from "../../components/NavBarComponent"
import vendorImage from "/vendor_images/cover-one.png"
import GrayContainer from "../../components/Layout/GrayContainer"
import WhiteInGrayContainer from "../../components/Layout/WhiteInGrayContainer"
import LandingFooter2 from "../../components/Footer/LandingFooter"
import CTAButton from "../../components/Forms/Buttons/CTAButton"
import ReviewCard from "../../components/Services/ReviewCard"

const Vendors = () => {
    const { category, title } = useParams()
    return (
        <>
            <header>
                <NavBarComponent />
                {/* Vendor cover image */}
                <div className="h-[480px] w-full overflow-hidden">
                    <img src={vendorImage} />
                </div>
            </header>
            <div className="p-8 px-[136px] flex flex-row gap-4">

                {/* First Column */}
                <div className="flex-[8] ">

                    <div className="text[12px] font-regular leading-[14.52px] text-[#808080]">
                        Category &gt;&gt; {category}
                    </div>

                    <div className="fw-[600] text-[#464B4F] text-[48px] leading-[58.09px] flex gap-4 align-end">{title}

                        <div className="flex-2 flex gap-1 items-center text-[#808080] text-[16px]">
                            (4.2) <img className="size-[16px]" src="/vendors-star.svg" />
                        </div>
                    </div>

                    {/*  */}
                    <div className="text-[24px] text-[#808080] flex gap-1 items-center">
                        <img className="size-[24px]" src="/vendors-location.svg" /> Bauchi
                    </div>

                    {/*  */}
                    <div className="flex justify-start mb-[30px]">
                        <Link to="chat">
                        <CTAButton iconBtnUrl="/message-text.svg" isIconBtn={true} title="Message" />
                        </Link>
                    </div>

                    <GrayContainer>
                        <WhiteInGrayContainer>
                            <div>
                                <h5 className="text-[#484848] leading-[19.36px]">Vendor Description</h5>
                                <p className="text-[#808080] text-[14px] leading-[20px]">Your go-to for exquisite, flavorful dishes. Elevate your taste experience with our curated selection of gourmet treats and comforting classics. Your go-to for exquisite, flavorful dishes. Elevate your taste experience with our curated selection of gourmet treats and comforting classics. Your go-to for exquisite, flavorful dishes. Elevate your taste experience with our curated selection of gourmet treats and comforting classics. Your go-to for exquisite, flavorful dishes. Elevate your taste experience with our curated selection of gourmet treats and comforting classics.</p>
                            </div>
                        </WhiteInGrayContainer>

                        <WhiteInGrayContainer>
                            <h5>Opening time</h5>
                            <p>Mon-Fri 09:00–16:00</p>
                            <p>Saturday (Only Appointments)</p>
                        </WhiteInGrayContainer>

                        <WhiteInGrayContainer>
                            <h5>Rate and Review</h5>
                            <hr />
                            <h6>Your review</h6>
                            <textarea className="border w-full min-h-[120px]" name="" id="">
                            </textarea>

                            <fieldset><input id="rememberMe" type="checkbox" /> <label htmlFor="rememberMe">Save my name, email, and website in this browser for the next time I comment.</label></fieldset>

                            <div>
                                <h5>Your overall rating of this listing:</h5>
                                <p className="flex-2 flex gap-1 items-start">
                                    <div className="flex-2 flex gap-1 items-center text-[#808080] text-[12px]">
                                        <img className="size-[16px]" src="/vendors-star.svg" />
                                        <img className="size-[16px]" src="/vendors-star.svg" />
                                        <img className="size-[16px]" src="/vendors-star.svg" />
                                        <img className="size-[16px]" src="/vendors-star.svg" />
                                    </div>
                                </p>
                            </div>

                            <h6>Title of your review</h6>
                            <input className="border w-full p-2" placeholder="Summarize your opinion or highlight an interesting detail" name="" id="" />

                            {/* Name and Email Row displayed using flex */}


                            {/* Submit call to action button */}
                            <div className="flex justify-start mt-2 mb-2">
                                <CTAButton title={"Submit your review"} />
                            </div>

                        </WhiteInGrayContainer>

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
                            <WhiteInGrayContainer>
                                <h3>Photo Gallery</h3>
                            </WhiteInGrayContainer>


                            <WhiteInGrayContainer>
                                <div className="text-center">
                                Write a review
                                </div>
                            </WhiteInGrayContainer>
                        </div>
                    </GrayContainer>

                    {/* Reviews */}
                    <h3 className="text-xl py-8 text-center">Reviews</h3>

                    <GrayContainer rounded={true}>
                       
                            <ReviewCard/>
                            <ReviewCard/>
                            <ReviewCard/>
                            <ReviewCard/>
                        
                        <div className="text-center">
                                View more
                                </div>
                    </GrayContainer>
                </div>
                {/* Right Column Ends */}
            </div>

            <LandingFooter2 />
        </>)
}

export default Vendors