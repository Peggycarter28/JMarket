import { ClipLoader } from "react-spinners"

const CTAButton = ({title, isIconBtn=false, iconBtnUrl, loadingState = false}) => {
    return (
        <div className="bg-[#EF6C00] flex gap-[10px] text-[white] rounded-[4px] items-center px-[20px] py-[10px]">
            {isIconBtn &&<img className="size-[24px]" src={iconBtnUrl}/>} {title} <div className="size-[16px]">
             
                         { loadingState == true && <ClipLoader color="#ccc" size={18} />}
                       
            </div>
        </div>
    )
}

export default CTAButton