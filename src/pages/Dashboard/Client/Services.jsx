import { useEffect, useState } from "react"
import CTAButton from "../../../components/Forms/Buttons/CTAButton"
import AddServiceModal from "../../../components/Modals/AddServiceModal"

const RenderServices = () => {

    const [showServiceModal, setShowServiceModal] = useState(false)

    const [user, setUser] = useState(null)

    const [myServices, setMyServices] = useState([])

    const toggleShowService = () => {
        setShowServiceModal(!showServiceModal)
    }

    useEffect(()=>{

        const storedUser = localStorage.getItem('user')

        const user = JSON.parse(storedUser)

        setUser(user)

        const storedServices = localStorage.getItem('vendors')

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

    }, [])


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
               
            </td>
        </tr>
    </table>
</div>

{showServiceModal == true && <AddServiceModal fetchedUser={user} handleModal={toggleShowService}/>}
</>
    )
}

export default RenderServices