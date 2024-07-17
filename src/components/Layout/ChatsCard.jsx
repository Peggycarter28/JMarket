const ChatsCard = () => {
    return (
        <div className="flex gap-2 m-2 mt-4 mb-4">
            {/* Image */}
            <div className="size-[81px] rounded-full overflow-hidden">
                <img className="h-[81px]" src="/product.png" alt="" />
            </div>

            {/* Chat details */}
            {/* Container */}
            <div className="rounded-[200px] bg-[#EDEDED] flex-1 px-6 py-2">
                <p className="text-[#464B4F] text-[16px] fw-600">Bee's Kitchen</p>
                <p className="text-[14px] leading-[20px] text-[#808080]">Good morning</p>
                <div className="flex justify-between text-[10px] leading-[20px] text-[#808080]">
                    <p>Delivered</p> <p>12:00PM</p>
                </div>
            </div>
        </div>
    )
}

export default ChatsCard