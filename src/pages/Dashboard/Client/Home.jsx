import GrayContainer from "../../../components/Layout/GrayContainer"
import HomeDashboardLayout from "../../../components/Layout/HomeDashboardLayout"
import UserDashboardLayout from "../../../components/Layout/UserDashboarLayout"

const ClientHome = () => {
    return (
        <>
            <HomeDashboardLayout>
                <div className="flex flex-wrap">
                    <div className="p-2 flex w-full h-[120px] flex md:w-1/3 overflow-hidden ">
                        <div className="text-[#ef6c00] border shadow-lg text-white w-full p-2 rounded-[16px]">
                            Paid Out
                        </div>
                    </div>

                    <div className="p-2 flex w-full h-[120px] flex md:w-1/3 overflow-hidden ">
                        <div className="text-[#2e7d32]  border shadow-lg text-white w-full p-2 rounded-[16px]">
                            Home Card 1
                        </div>
                    </div>

                    <div className="p-2 flex w-full h-[120px] flex md:w-1/3 overflow-hidden ">
                        <div className="text-[#ef6c00]  border shadow-lg text-white w-full p-2 rounded-[16px]">
                            Home Card 1
                        </div>
                    </div>

                    <div className="p-2 w-full h-[120px] flex overflow-hidden rounded-[16px]">
                    <GrayContainer noPadding={true}>
                        Home Card 4
                    </GrayContainer>
                    </div>
                </div>

                <div className="flex rounded-full  bg-[#e8e8e8] p-1 mt-10">
                    <h4 className="p-4 bg-[#2e7d32] text-[white] text-[] rounded-full">Orders</h4>
                    <h4 className="p-4 text-[#7f7d7d]">My Services</h4>
                    <h4 className="p-4 text-[#7f7d7d]">Payments</h4>
                </div>
                <h3 className="font-bold text-[36px] text-[#b4b4b4]">Orders</h3>

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
            </HomeDashboardLayout>
        </>)
}

export default ClientHome