import React from 'react';
import TopVendorsCard from '../components/LandingPage/TopVendorsCard';
import GrayContainer from '../components/Layout/GrayContainer';
import WhiteInGrayContainer from '../components/Layout/WhiteInGrayContainer';
import NavBarLandingComponent from '../components/NavBarLandingComponent';
import NavBarComponent from '../components/NavBarComponent';
import LeftsideBar from '../components/LandingPage/LeftSidebar';

const EcommercePage = () => {
  return (
    <GrayContainer>
    <div className="w-full">
      {/* Navigation Bar */}
      <WhiteInGrayContainer>
            <NavBarComponent/>
      </WhiteInGrayContainer>

      {/* Main Section */}
      
      <div className="flex mt-4 gap-2 mx-[100px]">
        {/* Categories Column */}
        
        <div className="w-2/12 space-y-4 h-[390px] overflow-hidden">
        <WhiteInGrayContainer rounded={true}>
          <LeftsideBar/>
          </WhiteInGrayContainer>
        </div>
        {/* Carousel Column */}
        <div className="w-8/12 h-96 relative">
          {/* Carousel Image */}
          <img
            src="https://via.placeholder.com/800x384"
            alt="carousel"
            className="w-full h-full object-cover"
          />
          {/* Image Overlay */}
          <div className="absolute top-4 left-4">
            <h2 className="text-4xl text-white font-bold">Explore great services in bauchi</h2>
            <button className="mt-2 px-4 py-2 bg-white text-black rounded-lg">Sign Up</button>
          </div>
          {/* Dots Indicator */}
          <div className="absolute bottom-4 w-full flex justify-center space-x-2">
            <span className="h-3 w-3 bg-white rounded-full"></span>
            <span className="h-3 w-3 bg-white rounded-full"></span>
            <span className="h-3 w-3 bg-white rounded-full"></span>
            <span className="h-3 w-3 bg-white rounded-full"></span>
            <span className="h-3 w-3 bg-white rounded-full"></span>
            <span className="h-3 w-3 bg-white rounded-full"></span>
          </div>
        </div>

        {/* Contact Column */}
        <div className="w-2/12 flex flex-col space-y-4">
          <div className="flex flex-col justify-center items-center h-48">
            <WhiteInGrayContainer rounded={true}>
            <div className="flex items-center space-x-2">
              <span>📞</span> <span>All to order, 07006000000</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🏭</span> <span>BConnect</span>
            </div>
            </WhiteInGrayContainer>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-200 h-48">
            <div className="flex items-center space-x-2">
              <span>🏭</span> <span>BConnect</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Containers */}
      <div className="grid grid-cols-6 gap-4 mt-4 mx-[100px]">
        {['Clearance Sales', 'New Arrivals', 'Appliances', 'Electronics', 'Gadgets', 'Special Offers'].map((label, index) => (
          <div key={index} className="relative h-56">
            <img
              src="https://via.placeholder.com/200x184"
              alt={label}
              className="w-full h-44 object-cover"
            />
            <div className=" bottom-2 left-2 text-black text-center px-2 py-1 rounded-lg">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>

<div className='mx-[100px]'>
<TopVendorsCard preData={[]} title={"Food Vendors"} />
</div>

<div className='mx-[100px]'>
<TopVendorsCard preData={[]} title={"Vehicle Vendors"} />
</div>
    </GrayContainer>
  );
};

export default EcommercePage;
