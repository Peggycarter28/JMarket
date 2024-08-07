import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/AppContextt"
import { initializePayment, verifyPayment } from "../../service/paymentService"
import { createOrder } from "../../service/orderService"
import { createTransaction } from "../../service/transactionService"
import { createVendorService } from "../../service/vendorListingService"

const AddServiceModal = ({ handleModal, fetchedUser, }) => {
    const user = useContext(UserContext)

    const [categories, setCategories] = useState(null)

    const [allLocalGovernment, setAllLocalGovernment] = useState(null)

    const [inProgress, setInProgress] = useState(false)

    const [title, setTitle] = useState(null)

    const [localGovernment, setLocalGovernment] = useState(null)

    const [category, setCategory] = useState(null)

    const [description, setDescription] = useState(null)

    const [geolocation, setGeolocation] = useState(null)

    const [serviceImage, setServiceImage] = useState(null)

    const [cac, setCAC] = useState(null)

    const [service_phone, setPhone] = useState(null)

    const [serviceCharge, setServiceCharge] = useState(null)

    const handleAddListing = async () => {
        setInProgress(true)

        if(description == null || title == null)
        {alert("Tile or description cannot be blank")
            return}

// Else continue. The return above will terminate the code block from running above because the description and title has not been provided yet
        const  data = {
            "owner": fetchedUser.id,
            "local_government": localGovernment,
            "category": category,
            "name": title,
            "description": description,
            "description_ha": "p",
            "phone": service_phone,
            "locationLat": 0,
            "locationLong": 0,
            "image_url": "/default_vendor_image.jpg",
            "rating": 0,
            "cac_number": cac,
            "service_charge":serviceCharge,
            "is_approved": false,
            "date_listed": new Date(Date.now()).toISOString()
        }

        console.log(data)
        
        const res = await createVendorService(data)

        if (res.status == 200 || res.status == 201) {
            console.log('service created')

            alert("Service submitted successfully! Please allow up to 24hours for your service to be approved.")

            handleModal()
        }

        else {
            setInProgress(false)
            alert("Failed! Something bad happened.")
        }
    }

    useEffect(() => {
       const storedLGA = localStorage.getItem('localGovernmentAreas')

       const storedCategories = localStorage.getItem('categories')

       if(storedLGA)
       {
        setAllLocalGovernment(JSON.parse(storedLGA))
       }

       if(storedCategories)
        {
         setCategories(JSON.parse(storedCategories))
        }


    }, []);

    // const handleWindowClose = async () => {

    //     console.log('New window closed!');
    //     // Trigger your function here

    //     const verify = await verifyPayment(paymentRef)

    //     if (verify.status == 200 || verify.status == 201) {
    //         console.log(verify.data)

    //         // Add order and transaction records to database
    //         const order_data = {
    //             by: verify.data.customer.email,
    //             referenceId: verify.data.reference,
    //             service: service_id,
    //             amount: verify.data.amount
    //         }

    //         const orderCreate = await createOrder(order_data)

    //         console.log(orderCreate)

    //         const transaction_data = {
    //             reference: verify.data.reference,
    //             status: verify.data.status,
    //             email: verify.data.customer.email,
    //             amount: verify.data.amount,
    //             channel: verify.data.channel,
    //             currency: verify.data.currency,
    //             by: fetchedUser?.id,
    //             service: service_id,
    //             service_creator: service_creator
    //         }

    //         const transactionCreate = await createTransaction(transaction_data)

    //         console.log(transactionCreate)

    //         setInProgress(false)

    //         handleModal()

    //         alert("Payment Successful")
    //     }

    //     else {

    //         setInProgress(false)
    //         alert("Payment Failed")

    //     }
    // };

    return (
        <div className="fixed h-screen w-full bg-[#808080a3] left-0 right-0 bottom-0 flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="bg-white p-4 rounded-lg shadow-2xl min-h-[400px] min-w-[70%] md:min-w-[70%] flex flex-col gap-2 overflow-y-scroll">
                <div className="flex justify-between">
                    <h4 className="font-bold text-[23px]">Add new Service</h4>
                    <div onClick={handleModal} className="size-[50px] bg-[red] flex justify-center items-center rounded text-white font-bold">X</div>
                </div>

                <div className="">
                    <p>Title</p> <p>{}</p>
                    <input onChange={(elem) => setTitle(elem.target.value)} value={title} className="border px-4 py-2 w-full" name="title" placeholder="Enter Title" type="text" />

                </div>

                <div className="">
                    <p>Description</p> <p>{}</p>
                    <textarea onChange={(elem) => setDescription(elem.target.value)} value={description} className="border px-4 py-2 w-full h-[40vh]" name="email" placeholder="Enter Description" type="text"></textarea>

                </div>

                <div className="">
                    <p>Business Line</p> <p>{}</p>
                    <input onChange={(elem) => setPhone(elem.target.value)} value={service_phone} className="border px-4 py-2 w-full" name="title" placeholder="Enter Phone" type="text" />
                </div>

                <div className="">
                    <p>Service Charge</p> <p>{}</p>
                    <input onChange={(elem) => setServiceCharge(elem.target.value)} value={serviceCharge} className="border px-4 py-2 w-full" name="title" placeholder="Enter Phone" type="text" />
                </div>

                <div className="flex justify-between gap-4">
                    <div className="flex-1">
                    <p>Category</p> 
                    <select className="border px-4 py-2 w-full" value={category} onChange={(elem)=> setCategory(elem.target.value)}>
                        <option value="">...select category</option>
                        {categories?.map(category=>{
                            return(
                                user.lang == "ha"
                               ?  <option value={category.id}>{category.name_ha}</option>
                               : <option value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                    </div>
                
                    <div className="flex-1">
                    <p>LGA</p>
                    <select className="border px-4 py-2 w-full" value={localGovernment} onChange={(elem)=> setLocalGovernment(elem.target.value)}>
                        <option value="">...select LGA</option>
                        <option value="1">Bauchi</option>
                        <option value="2">Toro</option>
                        <option value=""></option>
                    </select>
                    </div>

                    <div className="flex-1">
                    <p>C.A.C</p>
                    <input onChange={(elem) => setCAC(elem.target.value)} value={cac} className="border px-4 py-2 w-full" name="email" placeholder="Enter CAC" type="text" />

                    </div>
                </div>

                <div className="flex">
                    <button onClick={handleAddListing} className="bg-[#ef6c00] w-full text-white p-4 rounded-lg">{inProgress == true ? "Proceeding..." : "Add Photos"}</button>
                </div>

            </div>
        </div>)
}

export default AddServiceModal