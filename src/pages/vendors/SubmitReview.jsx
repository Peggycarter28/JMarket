import { useContext, useEffect, useState } from "react"
import WhiteInGrayContainer from "../../components/Layout/WhiteInGrayContainer"
import { UserContext } from "../../context/AppContextt"
import CTAButton from "../../components/Forms/Buttons/CTAButton"
import { sendReviewService } from "../../service/reviewService"

const SubmitReview = ({ listing_id }) => {
    const [rating, setRating] = useState(1)
    const [hoverRating, setHoverRating] = useState(0) // For hover effect

    const [body, setBody] = useState("")
    const [title, setTitle] = useState("")
    const [userr, setUserr] = useState(null)
    const [loading, setLoading] = useState(false)

    const { user } = useContext(UserContext)

    const handleReviewSubmit = async () => {
        setLoading(true)
        const data = {
            body,
            client_rating: rating,
            reviewBy: userr?.id,
            reviewFor: listing_id,
            title,
        }

        const res = await sendReviewService(data)

        if (res.status === 201 || res.status === 200) {
            setBody("")
            setTitle("")
            setRating(0)
            setLoading(false)
            alert("Submitted Successfully")
        } else {
            setLoading(false)
            alert("Something bad happened")
        }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUserr(JSON.parse(storedUser))
        }
    }, [])

    // Render stars
    const renderStar = (index) => {
        return (
            <svg
                key={index}
                onMouseEnter={() => setHoverRating(index)} // Hover effect
                onMouseLeave={() => setHoverRating(0)} // Reset hover effect
                onClick={() => setRating(index)} // Click to set rating
                width="24"
                height="24"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`cursor-pointer transition-all duration-200 ease-in-out
                ${index <= (hoverRating || rating) ? 'fill-orange' : 'fill-none'} 
                ${index <= rating ? 'border-orange' : 'border-gray'}`}
                style={{
                    fill: index <= (hoverRating || rating) ? "#EF6C00" : "none", // Orange when hovered or selected
                    stroke: "#808080", // Gray border
                    strokeWidth: "0.5px"
                }}
            >
                <path d="M6 0.5L7.34708 4.6459H11.7063L8.17963 7.2082L9.52671 11.3541L6 8.7918L2.47329 11.3541L3.82037 7.2082L0.293661 4.6459H4.65292L6 0.5Z" />
            </svg>
        )
    }

    return (
        <WhiteInGrayContainer>
            <h5>
                {user.lang === 'ha' ? `Kimanta da bita` : `Rate and Review`}
            </h5>
            <hr />
            <h6>
                {user.lang === 'ha' ? `Bincikinka` : `Your Review`}
            </h6>
            <textarea onChange={elem => setBody(elem.target.value)} value={body} className="border w-full min-h-[120px] appearance-none p-2 " placeholder="Type your review text here" />

            <fieldset><input id="rememberMe" type="checkbox" /> <label htmlFor="rememberMe">
                {user.lang === 'ha' ? `Ajiye sunana, imel, da shafin yanar gizo a wanan mai bincike don karo na gaba da zan yi sharhi` : `Save my name, email, and website in this browser for the next time I comment.`}
            </label></fieldset>

            <div className="py-4">
                <h5>
                    {user.lang === 'ha' ? `Jimlar kimar wannan jerin` : `Your overall rating of this listing:`}
                </h5>
                <p className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                        renderStar(star)
                    ))}
                </p>
            </div>

            <h6>Title of your review</h6>
            <input onChange={elem => setTitle(elem.target.value)} value={title} className="border w-full p-2" placeholder="Summarize your opinion or highlight an interesting detail" />

        {/* Name and Email Row displayed using flex */}


        {/* Submit call to action button */}
        <div onClick={handleReviewSubmit} className="flex justify-start mt-2 mb-2 cursor-pointer">
            <CTAButton loadingState={loading} title={user.lang == 'ha' ? "Aika bita naka": "Submit your review"} />
        </div>

    </WhiteInGrayContainer>)
}

export default SubmitReview
