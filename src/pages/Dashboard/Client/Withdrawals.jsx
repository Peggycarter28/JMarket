import { useContext, useEffect, useState } from "react"
import CTAButton from "../../../components/Forms/Buttons/CTAButton"
import AddServiceModal from "../../../components/Modals/AddServiceModal"
import { UserContext } from "../../../context/AppContextt"
import WithdrawalRequestModal from "../../../components/Modals/WithdrawalRequestModal"

const Withdrawals = () => {

    const name = "my services"

    const [showServiceModal, setShowServiceModal] = useState(false)

    const {user} = useContext(UserContext)

    const [userr, setUser] = useState(null)

    const [myServices, setMyServices] = useState([])

    const toggleShowService = () => {
        setShowServiceModal(!showServiceModal)
    }

    useEffect(()=>{

        const storedUser = localStorage.getItem('user')

        const user = JSON.parse(storedUser)

        setUser(user)

        const storedServices = localStorage.getItem('items')

        if(storedServices)
        {
            let services = JSON.parse(storedServices)

            console.log(services)

            // FInd my own services and return
            const myOwn = services.filter(service=> {return service.owner.id == user.id})

            if(myOwn.length > 0)
            {setMyServices(myOwn)}

            console.log(myOwn, "Completed")
        }

    }, [name])


    return(
        <>
     <h3 className="font-bold text-[36px] text-[#b4b4b4]">Services</h3>

     <div onClick={toggleShowService} className="flex p-4">
        <CTAButton title={"Add Service"}/>
     </div>

<div>
    <table className="w-full border text-[12px]">
        <tr>
            <td>Sn</td>
            <td>Date</td>
            <td>Description</td>
            <td>Category</td>
            <td>Price</td>
            <td>Action</td>
        </tr>
        {myServices.length > 0 ? myServices.map((item, index)=>{
            return(
        <tr className="bg-[#e8e8e8]">
            <td className="p-2">{index + 1}</td>
            <td>{new Date(item.date_listed).toDateString() }</td>
            <td>{user.lang == "ha" ? <p>{item.description_ha}</p> : <p>{item.description}</p>}</td>
            <td>{user.lang == "ha" ? <p>{item.category.name_ha}</p> : <p>{item.category.name}</p>}</td>
            <td>
                NGN{item.service_charge}
            </td>
            <td className="flex flex-col gap-1 p-2">
                <p className="block">
                    View
                </p>

                <p className="block">
                    Edit
                </p>
                </td>
        </tr>
            )
        }
    )
    : <p>No Service yet</p>
}
        
    </table>
</div>

{showServiceModal == true && <WithdrawalRequestModal fetchedUser={userr} handleModal={toggleShowService}/>}
</>
    )
}

export default Withdrawals