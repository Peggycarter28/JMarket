import { useContext, useEffect, useState } from "react"
import WhiteInGrayContainer from "../../components/Layout/WhiteInGrayContainer"
import { UserContext } from "../../context/AppContextt"
import CTAButton from "../../components/Forms/Buttons/CTAButton"
import { sendReviewService } from "../../service/reviewService"


const SubmitReview = ({listing_id}) => {

    const [rating, setStars] = useState(1)

    const [body, setBody] = useState("")

    const [title, setTitle] = useState("")

    const [userr, setUserr] = useState(null)

    const [loading, setLoading] = useState(false)

    const {user, setUser} = useContext(UserContext)

    const handleReviewSubmit = async () => {
        console.log("ReviewSubmit Called")

        setLoading(true)

        const data = {
            body: body,
            client_rating: rating,
            reviewBy: userr?.id,
            reviewFor: listing_id,
            title: title,
        }

        console.log(data)

        const res = await sendReviewService(data)

        if(res.status == 201 || res.status ==200)
        {
            console.log(res.data)
            setBody("")
            setTitle("")
            setStars(0)
            setLoading(false)
            alert("Submitted Successfully")
        }

        else {
                console.log(res.data)
                setLoading(false)
                alert("Something bad happened")
        }

    }

    useEffect(()=>{
        const storedUser = localStorage.getItem('user')

        if(storedUser)
        {setUserr(JSON.parse(storedUser))}
    }, [])

    return( <WhiteInGrayContainer>
        <h5>
        {user.lang == 'ha' ? `Kimanta da bita` :`Rate and Review`}
        </h5>
        <hr />
        <h6>
            {user.lang == 'ha' ? `Bincikinka` :`Your Review`}
        </h6>
        <textarea onChange={elem => setBody(elem.target.value)} value={body} className="border w-full min-h-[120px]" name="" id="">
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
                    <img onClick={()=>setStars(1)} className="size-[16px]" src="/vendors-star.svg" />
                    <img onClick={()=>setStars(2)} className="size-[16px]" src="/vendors-star.svg" />
                    <img onClick={()=>setStars(3)} className="size-[16px]" src="/vendors-star.svg" />
                    <img onClick={()=>setStars(4)} className="size-[16px]" src="/vendors-star.svg" />
                </div>
            </p>
        </div>

        <h6>Title of your review</h6>
        <input onChange={elem => setTitle(elem.target.value)} value={title} className="border w-full p-2" placeholder="Summarize your opinion or highlight an interesting detail" name="" id="" />

        {/* Name and Email Row displayed using flex */}


        {/* Submit call to action button */}
        <div onClick={handleReviewSubmit} className="flex justify-start mt-2 mb-2">
            <CTAButton loadingState={loading} title={user.lang == 'ha' ? "Aika bita naka": "Submit your review"} />
        </div>

    </WhiteInGrayContainer>)
}

export default SubmitReview