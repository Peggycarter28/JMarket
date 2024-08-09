import { useEffect, useState } from "react"
import { fetchTransactions } from "../../../service/transactionService"

const RenderTransactions = ({transactionsList, user}) => {

    const [transactions, setTransactions] = useState(transactionsList)

    const [isTxLoading, setIsTxLoading] = useState(false)

   

    return(<>
     <h3 className="font-bold text-[36px] text-[#b4b4b4]">Transactions - {transactions.length}</h3>

<div>
    <table className="w-full border text-[12px]">
        <tr>
            <td>Sn</td>
            <td>Type</td>
            <td>Date</td>
            <td>Amount</td>
            <td>Service ID</td>
            <td>Status</td>
        </tr>
        {transactions.length > 0 ? transactions.map((item,index) => {
            return(
        <tr className="bg-[#e8e8e8]">
            <td className="p-2">{index + 1}</td>
            <td className="p-2">{item.by == user.id ? "Expenditure" : "Income"}</td>
            <td>{new Date(item.date).toDateString()}</td>
            <td>{item.by == user.id ? "-" : "+"}{item.currency}{ parseFloat( Math.floor(item.amount /100 ) - Math.floor(item.amount *0.05 /100 )) }</td>
            <td>{item.service}</td>
            <td>{item.status}</td>
        </tr>)
        })

        : <tr><p>No records</p></tr>
        }
       
    </table>
</div>

    </>)
}

export default RenderTransactions