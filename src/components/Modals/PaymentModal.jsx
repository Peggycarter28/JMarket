import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/AppContextt"
import { initializePayment, verifyPayment } from "../../service/paymentService"
import { createOrder } from "../../service/orderService"
import { createTransaction } from "../../service/transactionService"
import { ClipLoader } from "react-spinners"

const PaymentModal = ({ handleModal, amount, fetchedUser, service_id, service_creator }) => {
    
    const user = useContext(UserContext)

    const [inProgress, setInProgress] = useState(false)

    const [newWindow, setNewWindow] = useState(null)

    const [paymentRef, setPaymentRef] = useState(null)

    const [url, setUrl] = useState(null)

    const [stage, setStage] = useState(0)

    const handlePayment = async () => {
        if (stage == 0) {

            setInProgress(true)

            const data = {
                "email": fetchedUser?.email,
                "amount": (parseInt(amount) + (5 / 100 * amount)) * 100,
                "service_id": service_id,
                "user_id": fetchedUser?.id
            }

            const res = await initializePayment(data)

            if (res.status == 200 || res.status == 201) {
                console.log('generated')

                setUrl(res.data['authorization_url'])

                setPaymentRef(res.data['reference'])

                setStage(1)

                setInProgress(false)

                // Open new window to finalize payment
            }

            else {
                setInProgress(false)
                alert("Failed! Something bad happened.")
            }
        }

        else if (stage == 1) {

            setInProgress(true)

            const win = window.open(url, '_blank', 'width=600,height=400')

            setNewWindow(win)

            console.log(newWindow)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (newWindow && newWindow.closed) {
                clearInterval(interval);
                handleWindowClose();
            }
        }, 1000); // Check every second

        return () => clearInterval(interval);
    }, [newWindow]);

    const handleWindowClose = async () => {

        console.log('New window closed!');
        // Trigger your function here 

        setStage(2)

        setInProgress(true)

        const verify = await verifyPayment(paymentRef)

        if (verify.status == 200 || verify.status == 201) {
            console.log(verify.data)

            // Add order and transaction records to database
            const order_data = {
                by: verify.data.customer.email,
                referenceId: verify.data.reference,
                service: service_id,
                amount: verify.data.amount
            }

            const orderCreate = await createOrder(order_data)

            console.log(orderCreate)

            const transaction_data = {
                reference: verify.data.reference,
                status: verify.data.status,
                email: verify.data.customer.email,
                amount: verify.data.amount,
                channel: verify.data.channel,
                currency: verify.data.currency,
                by: fetchedUser?.id,
                service: service_id,
                service_creator: service_creator
            }

            const transactionCreate = await createTransaction(transaction_data)

            console.log(transactionCreate)

            setInProgress(false)

            handleModal()

            alert("Payment Successful")

        }

        else {

            setInProgress(false)
            alert("Payment Failed")

        }
    };

    return (
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
                    <p>Service fee</p> <p>NGN <input type="number" /></p>
                </div>

                <div className="flex justify-between">
                    <p>Charge (5%)</p> <p>NGN {amount * 5 / 100}</p>
                </div>

                <div className="flex justify-between border-t pt-2 mt-4 text-[1.5rem] font-semibold">
                    <p className="">Total</p> <p>NGN{parseInt(amount) + (5 / 100 * amount)}</p>
                </div>

                <div className="flex flex-1">
                </div>

                <div className="flex">
                    <button onClick={handlePayment} className="bg-[#ef6c00] w-full text-white p-4 rounded-lg flex gap-2 justify-center items-center">{stage == 0 ? "Proceed" : stage == 1 ? "Proceed to Paystack" : stage == 2 ? "Checking Payment status" : ""}
                        <div className="size-[16px]">

                            {inProgress == true && <ClipLoader color="#ccc" size={18} />}

                        </div>
                    </button>

                </div>

            </div>
        </div>)
}

export default PaymentModal