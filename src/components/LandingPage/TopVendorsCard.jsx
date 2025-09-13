import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllVendorsService } from "../../service/vendorListingService";
import { UserContext } from "../../context/AppContextt";
import { ClipLoader } from "react-spinners";

const TopVendorsCard = ({ title, preData }) => {
    const { cart, } = useContext(UserContext);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
 

    

    useEffect(() => {
        if (preData.length !== 0) {
            setItems(preData);
            setLoading(false);
        } else {
            const storedItems = localStorage.getItem('items');

            if (storedItems) {
                setItems(JSON.parse(storedItems));
                setLoading(false);
            }
        }
    }, [preData]);

    useEffect(() => {
        if (preData.length === 0) {
            const fetch = async () => {
                const res = await getAllVendorsService();

                if (res.status === 200 || res.status === 201) {
                    const sortedItems = res.data.sort((a, b) => new Date(b.date_listed) - new Date(a.date_listed));
                    setItems(sortedItems);
                    localStorage.setItem('items', JSON.stringify(sortedItems));
                    setLoading(false);
                } else {
                    setLoading(false);
                    alert("Unable to fetch vendors. Kindly reload the page again.");
                }
            };

            fetch();
        }
    }, [preData]);

    return (
        <div className="flex-1">
            <h5 className="font-bold text-[24px] p-4 md:p-1">
                {title}
            </h5>

            <div className="flex flex-wrap w-full">
                {
                    loading ? (
                        <div className="flex justify-center items-center w-full text-[#993420]">
                            <ClipLoader color="#993420" size={35} />
                        </div>
                    ) : items.length === 0 ? (
                        "No Vendors found"
                    ) : items.map((item, index) => {
                        

                        return (
                            <div key={index} className="w-full md:w-1/5">
                                <div className="m-2 bg-white border md:border-none rounded-lg hover:shadow-lg p-2 cursor-pointer">
                                <Link to={`/service/${item.category.name}/${item.id}`}>
                                    <div className="w-full flex justify-center items-center md:w-auto h-[190px] rounded-lg overflow-hidden border">
                                        <img className="bg-green-600 object-cover h-full w-full" src={item.image_url} alt={item.name} />
                                    </div>
                                </Link>

                                <div className="flex flex-row justify-between">
                                    <Link to={`/service/${item.category.name}/${item.id}`}>
                                        <div className="flex-10">
                                            <h3 className="font-bold text-[16px] text-[#464B4F]">{item.name}</h3>
                                        </div>
                                    </Link>
                                    <div className="flex-2 flex gap-1 items-start">
                                        <div className="flex-2 flex gap-1 items-center text-[#808080] text-[12px]">
                                            ({Math.round(item.rating)}) <img className="w-[12px] h-[12px]" src="./vendors-star.svg" alt="rating star" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[12px] text-[#808080] flex gap-1 items-center">
                                    <img className="w-[12px] h-[12px]" src="./vendors-location.svg" alt="location" />
                                    {item.local_government.name}
                                </div>
                                <div className="flex justify-between mt-4">
                                    <Link to={item.id} className="justify-left">View</Link>

                                  
                                </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

          
        </div>
    );
};

export default TopVendorsCard;
