import { useEffect, useState } from "react"
import GrayContainer from "../../../components/Layout/GrayContainer"
import HomeDashboardLayout from "../../../components/Layout/HomeDashboardLayout"
import UserDashboardLayout from "../../../components/Layout/UserDashboarLayout"
import RenderTransactions from "./Transactions"
import RenderOrders from "./Orders"
import RenderServices from "./Services"
import { fetchTransactions } from "../../../service/transactionService"

const ClientHome = () => {

    const [currTab, setCurrTab] = useState(0)

    const [orders, setOrders] = useState(null)

    const [services, setServices] = useState(null)

    const [transactions, setTransactions] = useState(null)

    const [transactionsList, setTransactionsList] = useState(null)

    const [user, setUser] = useState(null)

    const handleTabChange = (currIndex) => {
        setCurrTab(currIndex)
    }

    useEffect(
        ()=>{
           const storedOrders = localStorage.getItem('userOrders')
           if(storedOrders)
           {
            setOrders(JSON.parse(storedOrders).length)
           }
        },[]
    )

    useEffect(()=>{

        const user = JSON.parse(localStorage.getItem('user'))

        if(user) {
            setUser(user)
        }

        const fetch = async ()=>{

        const tx = await fetchTransactions(user.id)

        if(tx.status == 200 || tx.status == 201)
        {
            setTransactionsList(tx.data)
            localStorage.setItem("userTransactions", JSON.stringify(tx.data))

            if(tx.data.length > 0)
            {
                console.log(tx.data)
                // Sum up total using reduce function
                const sum = tx.data.reduce((accumulator, transactionItem)=>{
                    return accumulator + (parseInt(transactionItem.amount)) //ParseInt because our transactions was coming as a string from database. You cant sum up strings
                }, 0)

                console.log(sum)

                setTransactions(sum/1000)
            }
        }
        }

        fetch()

    }, [])



    return (
        <>
            <HomeDashboardLayout>
                <div className="flex flex-wrap">
                    <div className="p-2 flex w-full h-[120px] flex md:w-1/2 overflow-hidden ">
                        <div className="text-[#ef6c00] border shadow-lg text-white w-full p-2 rounded-[16px]">
                            <h5 className="text-[#2e7d32] font-semibold text-[18px]">Orders</h5>
                            <p className="text-[gray] text-[2.5rem] font-bold">{orders}</p>
                        </div>
                    </div>

                    <div className="p-2 flex w-full h-[120px] flex md:w-1/2 overflow-hidden ">
                        <div className="text-[#2e7d32]  border shadow-lg text-white w-full p-2 rounded-[16px]">
                        <h5 className="text-[#2e7d32] font-semibold text-[18px]">Acrued Income</h5>
                        <p className="text-[gray] text-[2.5rem] font-bold">N{transactions}</p>
                        </div>
                    </div>

                    {/* <div className="p-2 flex w-full h-[120px] flex md:w-1/3 overflow-hidden ">
                        <div className="text-[#ef6c00]  border shadow-lg text-white w-full p-2 rounded-[16px]">
                        <h5 className="text-[#2e7d32] font-semibold text-[18px]">Reviews</h5>
                        <p className="text-[gray] text-[2.5rem] font-bold">0</p>
                        </div>
                    </div> */}

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
                : currTab == 1 ? <RenderServices/>
                : currTab == 2 ? <RenderTransactions transactionsList={transactionsList} user={user}/>
                : ""    
            }
            </HomeDashboardLayout>
        </>)
}

export default ClientHome