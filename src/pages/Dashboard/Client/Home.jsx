import { useEffect, useState } from "react"
import GrayContainer from "../../../components/Layout/GrayContainer"
import HomeDashboardLayout from "../../../components/Layout/HomeDashboardLayout"
import UserDashboardLayout from "../../../components/Layout/UserDashboarLayout"
import RenderTransactions from "./Transactions"
import RenderOrders from "./Orders"

const ClientHome = () => {

    const [currTab, setCurrTab] = useState(0)

    const [orders, setOrders] = useState(null)

    const [services, setServices] = useState(null)

    const [transactions, setTransactions] = useState(null)

    const handleTabChange = (currIndex) => {
        setCurrTab(currIndex)
    }
const renderServices = () => {
    return(<>
     <h3 className="font-bold text-[36px] text-[#b4b4b4]">Services</h3>

<div>
    <table className="w-full border text-[12px]">
        <tr>
            <td>Sn</td>
            <td>Date</td>
            <td>From</td>
            <td>Service</td>
            <td>Status</td>
        </tr>
        <tr className="bg-[#e8e8e8]">
            <td className="p-2">1</td>
            <td>12th July, 2024</td>
            <td>Jonas Blue</td>
            <td>Laundry</td>
            <td>
                <p>Pending</p>
                <select name="" id="">
                    <option value="">...option</option>
                    <option value="">In Progress</option>
                    <option value="">Decline</option>
                    <option value="">Completed</option>
                </select>
            </td>
        </tr>
        <tr className="bg-[]">
            <td className="p-2">2</td>
            <td>12th July, 2024</td>
            <td>Jonas Blue</td>
            <td>Laundry</td>
            <td>
                <p>Pending</p>
                <select name="" id="">
                    <option value="">...option</option>
                    <option value="">In Progress</option>
                    <option value="">Decline</option>
                    <option value="">Completed</option>
                </select>
            </td>
        </tr>
        <tr className="bg-[#e8e8e8]">
            <td className="p-2">3</td>
            <td>12th July, 2024</td>
            <td>Jonas Blue</td>
            <td>Laundry</td>
            <td>
                <p>Pending</p>
                <select name="" id="">
                    <option value="">...option</option>
                    <option value="">In Progress</option>
                    <option value="">Decline</option>
                    <option value="">Completed</option>
                </select>
            </td>
        </tr>
        <tr className="bg-[]">
            <td className="p-2">4</td>
            <td>12th July, 2024</td>
            <td>Jonas Blue</td>
            <td>Laundry</td>
            <td>
                <p>Pending</p>
                <select name="" id="">
                    <option value="">...option</option>
                    <option value="">In Progress</option>
                    <option value="">Decline</option>
                    <option value="">Completed</option>
                </select>
            </td>
        </tr>
        <tr className="bg-[]">
            <td className="p-2">5</td>
            <td>12th July, 2024</td>
            <td>Jonas Blue</td>
            <td>Laundry</td>
            <td>
                <p>Pending</p>
                <select name="" id="">
                    <option value="">...option</option>
                    <option value="">In Progress</option>
                    <option value="">Decline</option>
                    <option value="">Completed</option>
                </select>
            </td>
        </tr>
        <tr className="bg-[]">
            <td className="p-2">6</td>
            <td>12th July, 2024</td>
            <td>Jonas Blue</td>
            <td>Laundry</td>
            <td>
                <p>Pending</p>
                <select name="" id="">
                    <option value="">...option</option>
                    <option value="">In Progress</option>
                    <option value="">Decline</option>
                    <option value="">Completed</option>
                </select>
            </td>
        </tr>
        <tr className="bg-[]">
            <td className="p-2">7</td>
            <td>12th July, 2024</td>
            <td>Jonas Blue</td>
            <td>Laundry</td>
            <td>
                <p>Pending</p>
                <select name="" id="">
                    <option value="">...option</option>
                    <option value="">In Progress</option>
                    <option value="">Decline</option>
                    <option value="">Completed</option>
                </select>
            </td>
        </tr>
    </table>
</div>

    </>)
}



    return (
        <>
            <HomeDashboardLayout>
                <div className="flex flex-wrap">
                    <div className="p-2 flex w-full h-[120px] flex md:w-1/3 overflow-hidden ">
                        <div className="text-[#ef6c00] border shadow-lg text-white w-full p-2 rounded-[16px]">
                            <h5 className="text-[#2e7d32] font-semibold text-[18px]">Orders</h5>
                            <p className="text-[gray] text-[2.5rem] font-bold">0</p>
                        </div>
                    </div>

                    <div className="p-2 flex w-full h-[120px] flex md:w-1/3 overflow-hidden ">
                        <div className="text-[#2e7d32]  border shadow-lg text-white w-full p-2 rounded-[16px]">
                        <h5 className="text-[#2e7d32] font-semibold text-[18px]">Amount Spent</h5>
                        <p className="text-[gray] text-[2.5rem] font-bold">N0</p>
                        </div>
                    </div>

                    <div className="p-2 flex w-full h-[120px] flex md:w-1/3 overflow-hidden ">
                        <div className="text-[#ef6c00]  border shadow-lg text-white w-full p-2 rounded-[16px]">
                        <h5 className="text-[#2e7d32] font-semibold text-[18px]">Reviews</h5>
                        <p className="text-[gray] text-[2.5rem] font-bold">0</p>
                        </div>
                    </div>

                    <div className="p-2 w-full h-[120px] flex overflow-hidden rounded-[16px]">
                    <GrayContainer noPadding={true}>
                        Promo/Ads Area
                    </GrayContainer>
                    </div>
                </div>

                <div className="flex rounded-full h-[50px] bg-[#e8e8e8] p-1 mt-10">
                    <h4 onClick={()=>{handleTabChange(0)}} className={`p-2 text-[10px] md:text-[14px] ${currTab == 0 ? 'bg-[#ef6c00] text-[white] rounded-full' : "text-[#7f7d7d]"} flex justify-center items-center`}>Orders</h4>
                    <h4 onClick={()=>{handleTabChange(1)}} className={`p-2 text-[10px] md:text-[14px] ${currTab == 1 ? 'bg-[#ef6c00] text-[white] rounded-full' : "text-[#7f7d7d]"} text-[#7f7d7d] flex justify-center items-center`}>My Services</h4>
                    <h4 onClick={()=>{handleTabChange(2)}} className={`p-2 text-[10px] md:text-[14px] ${currTab == 2 ? 'bg-[#ef6c00] text-[white] rounded-full' : "text-[#7f7d7d]"} text-[#7f7d7d] flex justify-center items-center`}>Transaction History</h4>
                </div>
                
                {
                
                currTab == 0 ? <RenderOrders/>
                : currTab == 1 ? renderServices()
                : currTab == 2 ? <RenderTransactions/>
                : ""    
            }
            </HomeDashboardLayout>
        </>)
}

export default ClientHome