const GrayContainer = ({ children, rounded=false, noPadding=false }) => {
    return (<>
        {/* Gray container */}
        {rounded ?
        <div className={`bg-[#EDEDED] flex-1 ${noPadding == true ? "" : "p-2"} } rounded-[16px] `}>
            {children}
        </div>
        :
        <div className={`bg-[#EDEDED] flex-1  ${noPadding == true ? "" : "p-2"}`}>
            {children}
        </div>
}
    </>)
}

export default GrayContainer