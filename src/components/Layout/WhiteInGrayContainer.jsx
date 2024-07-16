const WhiteInGrayContainer = ({ children, rounded=false }) => {
    return (<>
    {rounded ?
       
        <div className="bg-[white] p-4 rounded-[16px]">
            {children}
        </div>
        : 
        <div className="bg-[white] p-4 mb-8">
        {children}
    </div>
        }
    </>)
}

export default WhiteInGrayContainer