const Chats = ({type, message, time}) => {
    return(
        <>
        { type !== "reply" ?
        <div className="m-2 p-4 w-[60%] rounded-bl-[200px] md:rounded-bl-[400px] rounded-r-[100px] md:rounded-r-[200px] ">
        <div className="bg-[#F49D5440] rounded-bl-[800px] rounded-r-[400px] p-4 ">
    <p className="text-[12px] md:text-[14px] text-[#464B4F]">{message}</p>
    
        </div>
        <p className="text-[#808080] text-[10px] md:text-[14px]">{time}</p>
        </div>
        :
        <div className="m-2 p-4 w-[60%] self-end rounded-l-[400px] rounded-br-[800px] ">
        <div className="bg-[#58975B40] rounded-l-[400px] rounded-br-[800px] p-4">
    <p className="text-[12px] md:text-[14px] text-[#464B4F]">{message}</p>
        </div>
        <p className="text-[#808080] text-[10px] md:text-[14px] text-right">{time}</p>
        </div>
        }
        </>
    )
}

export default Chats