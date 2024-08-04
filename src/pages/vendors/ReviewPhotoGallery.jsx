import { useContext, useEffect, useState } from "react"
import WhiteInGrayContainer from "../../components/Layout/WhiteInGrayContainer"
import { UserContext } from "../../context/AppContextt"
import { useParams } from "react-router-dom"
import { getPhotos, getReviews } from "../../service/reviewService"

const ReviewPhotoGallery = () => {
    const {user, setUser} = useContext(UserContext)

    const { category, title } = useParams()

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        console.log("Fetching Photo Gallery")

        const fetch = async () => {
            
            const res = await getPhotos(title)

            if (res.status == 200 || res.status == 201) {

                console.log("FOund photos")

                console.log(res.data)

                setPhotos(res.data)
            }
            else { alert("Unable to fetch review photos") }
        }

        fetch()

    }, [])



    return(
        <WhiteInGrayContainer>
        <h3>
            {user.lang == 'ha' ? "Gidan hotuna" : "Photo Gallery"}</h3>

            <ul className="flex">
                {photos.map((photo, index) => {
                    return(<li key={photo+index} className="bg-[red] w-1/3">
                        <img  height={60} width={60} src={photo.image_url} alt={photo.name} />
                    </li>)
                })}
            </ul>
    </WhiteInGrayContainer>

    )
}

export default ReviewPhotoGallery