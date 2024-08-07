import { useEffect, useState } from "react"
import { getOrders, updateOrder } from "../../../service/orderService"

const RenderOrders = () => {
    const name = "orders"
    const [orders, setOrders] = useState([])

    const [isTxLoading, setIsTxLoading] = useState(false)

    const [updating, setUpdating] = useState(false)

    const handleOrderStatusUpdate = async (orderId, status, index, item) => {

        if(status== "")
        {return}

        setUpdating(true)

        const data = {...item,
            status: status
        }

        const tx = await updateOrder(data, orderId)

        if(tx.status == 200 || tx.status == 201)
        {
            const updatedOrders = [...orders]

            updatedOrders[index] = {...updatedOrders[index], status: status}

            setOrders(updatedOrders)

            localStorage.setItem('userOrders', JSON.stringify(updatedOrders))

            setUpdating(false)
            alert("Order Updated Successfully")
        }
    }

    
        
        const storedOrders  = () => {
            const order = localStorage.getItem('userOrders')
            if(order)
            {setOrders(JSON.parse(order))}
            
         }
 
    

    useEffect(()=>{

        storedOrders()

        const user = JSON.parse(localStorage.getItem('user'))

        const fetch = async ()=>{

        const tx = await getOrders(user.id)

        if(tx.status == 200 || tx.status == 201)
        {
            if (orders && orders.length < tx.data.length)
            {
                console.log("Length",orders.length, tx.data.length) 

               const newItems = tx.data.slice(orders.length)

               const updatedItems =  [...orders, ...newItems]

               console.log(updatedItems)

               localStorage.setItem('userOrders', JSON.stringify(updatedItems))

               storedOrders()
               
            }
            // console.log(tx.statusText, tx.status, tx.data)
            
        }
        }

        // ? console.log("Found order records")

        fetch()

    }, [])

    return(<>
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
        {orders.length > 0 ? orders.map((item, index)=>
        <tr key={item+index} className={item.status == "PENDING" ? `bg-[#ffc2c2]` : `bg-[white]`}>
            <td className="p-2">{index+1}</td>
            <td>{new Date(item.date).toDateString()}</td>
            <td>{item.by}</td>
            <td>{item.service.name}</td>
            <td>
                <p>{item.status}</p>
                <select name="" id="" onChange={elem=> handleOrderStatusUpdate(item.id, elem.target.value, index, item)}>
                    <option value="">...option</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </td>
        </tr>)

        : <p>No Orders Yet</p>
}
    </table>
</div>

    </>)
}

export default RenderOrders
