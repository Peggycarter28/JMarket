import { useContext, useState } from "react"
import WhiteInGrayContainer from "../../components/Layout/WhiteInGrayContainer"
import { UserContext } from "../../context/AppContextt"
import CTAButton from "../../components/Forms/Buttons/CTAButton"


const SubmitReview = () => {

    const [star, setStars] = useState(0)

    const {user, setUser} = useContext(UserContext)

    return( <WhiteInGrayContainer>
        <h5>
        {user.lang == 'ha' ? `Kimanta da bita` :`Rate and Review`}
        </h5>
        <hr />
        <h6>
            {user.lang == 'ha' ? `Bincikinka` :`Your Review`}
        </h6>
        <textarea className="border w-full min-h-[120px]" name="" id="">
        </textarea>

        <fieldset><input id="rememberMe" type="checkbox" /> <label htmlFor="rememberMe">
            {user.lang == 'ha' ? `Ajiye sunana, imel, da shafin yanar gizo a wanan mai bincike don karo na gaba da zan yi sharhi` :`Save my name, email, and website in this browser for the next time I comment.`}
            </label></fieldset>

        <div>
            <h5>
            {user.lang == 'ha' ? `Jimlar kimar wannan jerin` :`Your overall rating of this listing:.`}
                </h5>
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
            <CTAButton title={user.lang == 'ha' ? "Aika bita naka": "Submit your review"} />
        </div>

    </WhiteInGrayContainer>)
}

export default SubmitReview