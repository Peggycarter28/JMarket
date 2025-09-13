const LandingFooter2 = () => {
    return(
        <footer className="flex flex-col w-full h-[500px] mt-12">
            <div className="h-[200px] w-full flex flex-col md:flex-row items-center justify-center ">
                <div className="h-[180px] w-full bg-center bg-footer_image bg-no-repeat"></div>
            </div>
            <div className="h-[800px] bg-[#993420] p-4 flex text-[#e8e8e8]flex-col md:flex-row ">
                <div className="flex-1 text-white p-2 text-[12px]">
                    <address className="text-sm">
                        Jos South Plateau state, Nigeria.
                    </address>

                    <p className="text-sm">Phone: 08000000001</p>

                    
                   

                    <p className="text-sm">Email: jmarketplace@gmail.com</p>
                </div>
                <div className="flex-1 text-white p-1 text-[12px]">
                    <h4 className="font-bold text-xl">About</h4>
                    <p className="text-sm leading-4">Plateau state is one of the 36 states in Nigeria. It is blessed with many resources, people and culture and boost of diverse value which it offers to the country and the world at large. JMarketPlace is here to connect you with the right vendors and services you need</p>
                </div>
            </div>
        </footer>
    )
}

export default LandingFooter2