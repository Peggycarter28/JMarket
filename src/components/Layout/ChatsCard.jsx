import { Link, useParams } from "react-router-dom"

const ChatsCard = ({ data, userId }) => {
console.log(userId)
    return (
        <div className={`flex gap-2 m-2 mt-4 mb-4`}>
            {/* Image */}
            <div className="size-[81px] flex-2 rounded-full overflow-hidden">
                <img className="h-[81px]" src="/product.png" alt="" />
            </div>

            {/* Chat details */}
            {/* Container */}

            <div className="rounded-[200px] bg-[#EDEDED] flex-[10] px-6 py-2 flex flex-col flex-wrap">
                <Link to={`${data.receiver.id}/${data.id}`}>
                    <div className="text-[#464B4F] text-[16px] fw-600">
                        <span>
                        {data.sender.id === userId ? (
                <p>You to {data.receiver.username}</p>
            ) : (
                <p>From {data.sender.username} to you</p>
            )}
                        </span> on <span> {

                            data.listing.name
                        }
                        </span>

                    </div>
                    <p className="text-[14px] leading-[20px] text-[#808080]">Good morning</p>
                    <div className="flex justify-between text-[10px] leading-[20px] text-[#808080]">
                        <p>Delivered</p> <p>12:00PM</p>
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default ChatsCard