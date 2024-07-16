const CTAButton = ({title, isIconBtn=false, iconBtnUrl}) => {
    return (
        <div className="bg-[#EF6C00] flex gap-[10px] item-start text-[white] rounded-[4px] px-[20px] py-[10px]">
            {isIconBtn &&<img className="size-[24px]" src={iconBtnUrl}/>} {title}
        </div>
    )
}

export default CTAButton