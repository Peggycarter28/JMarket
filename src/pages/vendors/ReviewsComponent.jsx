import { useContext, useEffect, useState } from "react"
import GrayContainer from "../../components/Layout/GrayContainer"
import ReviewCard from "../../components/Services/ReviewCard"
import { UserContext } from "../../context/AppContextt"
import { useParams } from "react-router-dom"
import { getVendorByIdService } from "../../service/vendorListingService"
import { getReviews } from "../../service/reviewService"

const ReviewsComponent = () => {

    const {user, setUser} = useContext(UserContext)

    const { category, title } = useParams()

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        console.log("Fetching Listing Reviews")

        const fetch = async () => {
            
            const res = await getReviews(title)

            if (res.status == 200 || res.status == 201) {

                console.log(res.data)

                setReviews(res.data)
            }
            else { alert("Unable to fetch listing reviews") }
        }

        fetch()

    }, [])

    return(
    <>
          {/* Reviews */}
          <h3 className="text-xl py-8 text-center">{user.lang == 'ha' ? "Bita" : "Reviews"} ({reviews.length})</h3>

<GrayContainer rounded={true}>
   {reviews.length > 0
       ? <ReviewCard/>
       : <p className="text-center">No reviews yet</p>
   }
    <div className="text-center">
            View more
            </div>
</GrayContainer>
    </>)
}

export default ReviewsComponent