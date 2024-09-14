import { useContext, useEffect, useState } from "react"
import CTAButton from "../../../components/Forms/Buttons/CTAButton"
import AddServiceModal from "../../../components/Modals/AddServiceModal"
import { UserContext } from "../../../context/AppContextt"
import WithdrawalRequestModal from "../../../components/Modals/WithdrawalRequestModal"
import { getVendorWithdrawalService } from "../../../service/vendorListingService"

const Withdrawals = () => {

    const name = "my services"

    const [showServiceModal, setShowServiceModal] = useState(false)

    const {user} = useContext(UserContext)

    const [userr, setUser] = useState(null)

    const [myServices, setMyServices] = useState([])

    const toggleShowService = () => {
        setShowServiceModal(!showServiceModal)
    }

    const fetchWithdrawalRecords = async () => {
       const res = await getVendorWithdrawalService()
       if(res.status == 200 || res.status == 201)
       {
        const found = res.data

            if(found.length > 0)
            {
                const myOwn = found.filter(record=> {return record.owner_id == user.id})

                setMyServices(myOwn)
                console.log(myOwn, "Completed")
            }

       }
       else{

            console.log("Something bad happened!")

       }
    }

    useEffect(()=>{

        const storedUser = localStorage.getItem('user')

        const user = JSON.parse(storedUser) 

        setUser(user)

        fetchWithdrawalRecords()

    }, [name])


    return(
        <>
     <h3 className="font-bold text-[36px] text-[#b4b4b4]">Withdrawal Requests</h3>

     <div onClick={toggleShowService} className="flex p-4">
        <CTAButton title={"New Request"}/>
     </div>

<div>
    <table className="w-full border text-[12px]">
        <tr>
            <td>Sn</td>
            <td>Date</td>
            <td>Reference</td>
            <td>Account Name</td>
            <td>Account Number</td>
            <td>Amount</td>
            <td>Status</td>
        </tr>
        {myServices.length > 0 ? myServices.map((item, index)=>{
            return(
        <tr className="bg-[#e8e8e8]">
            <td className="p-2">{index + 1}</td>
            <td>{new Date(item.date).toDateString() }</td>
            <td>{user.lang == "ha" ? <p>{item.reference}</p> : <p>{item.reference}</p>}</td>
            <td>{user.lang == "ha" ? <p>{item.name}</p> : <p>{item.name}</p>}</td>
            <td>{user.lang == "ha" ? <p>{item.account_number}</p> : <p>{item.account_number}</p>}</td>
            <td>
                NGN{item.amount}
            </td>
            <td className="flex flex-col gap-1 p-2">
                {item.status}
                </td>
        </tr>
            )
        }
    )
    : <p>No Withdrawal Request yet</p>
}
        
    </table>
</div>

{showServiceModal == true && <WithdrawalRequestModal fetchedUser={userr} handleModal={toggleShowService}/>}
</>
    )
}

export default Withdrawals