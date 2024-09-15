const WhiteInGrayContainer = ({ children, rounded=false }) => {
    return (<>
    {rounded ?
       
        <div className="bg-[white] p-4 rounded-[16px] h-full">
            {children}
        </div>
        : 
        <div className="bg-[white] p-4 mb-8 h-full">
        {children}
    </div>
        }
    </>)
}

export default WhiteInGrayContainer