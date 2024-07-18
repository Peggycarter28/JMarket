import { Link } from "react-router-dom"
import WhiteInGrayContainer from "../Layout/WhiteInGrayContainer"

const ReviewCard = () => {
    return (<>
        <div className="p-2">
            <WhiteInGrayContainer rounded={true}>
                <div className="flex items-center gap-2">
                    <div className="bg-[red] size-[50px] rounded-[25px] flex items-center justify-center">
                        <img src="/user_thumbs/thumb.png" alt="Pic" />
                    </div>
                    <Link to={"../user/petergambo"}><p>Abubakar Laushi</p></Link>
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
                    <p>A very nice experience!!</p>
                    <p>"Fantastic experience! [Vendor's Name] was with us every step of the way, offering support and guidance."</p>
                </div>

            </WhiteInGrayContainer>
        </div>

    </>)
}

export default ReviewCard