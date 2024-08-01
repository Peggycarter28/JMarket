import { useContext, useState } from "react"
import { UserContext } from "../../context/AppContextt"
import { initializePayment } from "../../service/paymentService"

const PaymentModal = ({handleModal, amount, fetchedUser, service_id}) => {
    const user = useContext(UserContext)

    const [inProgress, setInProgress] = useState(false)

    const handlePayment = async () => {
        setInProgress(true)
        const data = {
            "email": fetchedUser?.email,
            "amount": (parseInt(amount) + (5/100 * amount)) * 1000,
            "metadata": {
                "service_id": service_id,
                "user_id": fetchedUser?.id
            }
        }

        console.log(data)
const res = await initializePayment(data)

if (res.status == 200 || res.status == 201)
{
    setInProgress(false)
    alert("Order generated successfully")
}

else {
    setInProgress(false)
    alert("Failed! Something bad happened.")
}
    }

    return(
    <div className="fixed h-screen w-full bg-[#808080a3] left-0 right-0 bottom-0 flex flex-col items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-2xl min-h-[400px] min-w-[300px] md:min-w-[400px] flex flex-col gap-2">
            <div className="flex justify-between">
            <h4 className="font-bold text-[23px]">BConnect Pay</h4>
             <div onClick={handleModal} className="size-[50px] bg-[red] flex justify-center items-center rounded text-white font-bold">X</div>
             </div>

             <div className="flex justify-between">
                <p>Email</p> <p>{fetchedUser?.email}</p>
             </div>

             <div className="flex justify-between">
             <p>Service fee</p> <p>NGN {amount}</p>
             </div>

             <div className="flex justify-between">
             <p>Charge (5%)</p> <p>NGN {amount * 5 / 100}</p>
             </div>

             <div className="flex justify-between border-t pt-2 mt-4 text-[1.5rem] font-semibold">
             <p className="">Total</p> <p>NGN{ parseInt(amount) + (5/100 * amount)}</p>
             </div>

             <div className="flex flex-1">
             </div>

             <div className="flex">
                <button onClick={handlePayment} className="bg-[#ef6c00] w-full text-white p-4 rounded-lg">{inProgress == true ? "Processing..." : "Pay with Paystack"}</button>
             </div>

        </div>
    </div>)
}

export default PaymentModal