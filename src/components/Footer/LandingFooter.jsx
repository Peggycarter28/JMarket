const LandingFooter2 = () => {
    return(
        <footer className="flex flex-col w-full h-[500px] mt-12">
            <div className="h-[290px] w-full flex flex-col md:flex-row items-center justify-center ">
                <div className="h-[180px] w-full bg-center bg-footer_image bg-no-repeat"></div>
            </div>
            <div className="h-[1500px] bg-[#2E7D32] p-4 flex text-[e8e8e8]flex-col md:flex-row ">
                <div className="flex-1 text-white p-2 text-[12px]">
                    <address>
                        Bauchi state, Nigeria.
                    </address>

                    <p>Phone: 08000000000</p>

                    
                   

                    <p>Email: barakalaushi@gmail.com</p>
                </div>
                <div className="flex-1 text-white p-2 text-[12px]">
                    <h4 className="font-bold">About</h4>
                    <p>Bauchi state is one of the 36 states in Nigeria. It is blessed with many resources, people and culture and boost of diverse value which it offers to the country and the world at large. BConnect is here to connect you with the right vendors and services you need</p>
                </div>
            </div>
        </footer>
    )
}

export default LandingFooter2