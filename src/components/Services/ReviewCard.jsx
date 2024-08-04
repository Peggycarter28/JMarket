import { Link } from "react-router-dom"
import WhiteInGrayContainer from "../Layout/WhiteInGrayContainer"

const ReviewCard = ({item}) => {
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
                        <img className="size-[16px]" src="/vendors-star.svg" />
                        <img className="size-[16px]" src="/vendors-star.svg" />
                        <img className="size-[16px]" src="/vendors-star.svg" />
                        <img className="size-[16px]" src="/vendors-star.svg" />
                    </div>
                    <p>12/01/2024</p>
                </div>

                <div>
                    <p>{item.title}</p>
                    <p>{item.body}</p>
                </div>

            </WhiteInGrayContainer>
        </div>

    </>)
}

export default ReviewCard