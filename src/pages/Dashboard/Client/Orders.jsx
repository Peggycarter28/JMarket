import { useEffect, useState } from "react"
import { getOrders } from "../../../service/orderService"

const RenderOrders = () => {
    const [orders, setOrders] = useState([])

    const [isTxLoading, setIsTxLoading] = useState(false)

    useEffect(()=>{

        const user = JSON.parse(localStorage.getItem('user'))

        const fetch = async ()=>{

        const tx = await getOrders(user.id)

        if(tx.status == 200 || tx.status == 201)
        {
            setOrders(tx.data)
        }
        }

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
        <tr key={item+index} className="bg-[#e8e8e8]">
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
        </tr>)

        : <p>No Orders Yet</p>
}
    </table>
</div>

    </>)
}

export default RenderOrders
