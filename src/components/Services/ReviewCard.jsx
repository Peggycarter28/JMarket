import { Link } from "react-router-dom"
import WhiteInGrayContainer from "../Layout/WhiteInGrayContainer"
import { useContext } from "react"
import { UserContext } from "../../context/AppContextt"

const ReviewCard = ({item}) => {

    const {user, setUser} = useContext(UserContext)

    const getRating = () => {
console.log(Math.ceil(item.client_rating))
        for (let index = 0; index < Math.ceil(item.client_rating); index++) {
            return  <img className="size-[16px]" src="/vendors-star.svg" />
            
        }

        
    }
    return (<>
        <div className="p-2">
            <WhiteInGrayContainer rounded={true}>
                <div className="flex items-center gap-2">
                    <div className="bg-[red] size-[50px] rounded-[25px] flex items-center justify-center">
                        <img src="/user_thumbs/thumb.png" alt="Pic" />
                    </div>
                    <Link to={"../user/petergambo"}><p>{item.reviewBy.first_name !== "" || item.reviewBy.last_name !== "" ? `${item.reviewBy.first_name} ${item.reviewBy.last_name}` : item.reviewBy.username}</p></Link>
                </div>


                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center">
                        {
                            getRating()                
}
                    </div>
                    <p>{new Date(item.date).toDateString()}</p>
                </div>

                <div>
                {user.lang == 'ha' ? <p>{item.title_ha}</p> : <p>{item.title}</p>}
                    
                {user.lang == 'ha' ?  <p>{item.body_ha}</p> :  <p>{item.body}</p>}
                   
                </div>

            </WhiteInGrayContainer>
        </div>

    </>)
}

export default ReviewCard