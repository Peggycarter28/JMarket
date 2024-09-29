import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllVendorsService } from "../../service/vendorListingService";
import { UserContext } from "../../context/AppContextt";
import { ClipLoader } from "react-spinners";

const TopVendorsCard = ({ title, preData }) => {
    const { user, setUser, cart, addToCart, removeFromCart } = useContext(UserContext);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(true);
    const [amount, setAmount] = useState(null)

    const toggleCart = (itemId, isAdding) => {
        setCurrentItemId(itemId);
        setIsAddingToCart(isAdding);
        setOverlayVisible(true);
    };

    const handleConfirmAction = () => {
        const itemToAddOrRemove = items.find(item => item.id === currentItemId);
    
        if (isAddingToCart) {
            // Add item to cart if it's not already in the cart
            const itemExists = cart.some(item => item.id === currentItemId);
    
            if (!itemExists) {
                addToCart({ ...itemToAddOrRemove, amount: parseInt(amount) || null });

                console.log({ ...itemToAddOrRemove, amount: parseInt(amount) || null })
                setAmount('')
            } else {
                console.log("Item already in cart");
            }
        } else {
            // Remove item from cart if it exists
            removeFromCart(currentItemId);
        }
    
        setOverlayVisible(false);
    };
    

    const handleCancelAction = () => {
        setOverlayVisible(false);
    };

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

            <div className="flex flex-wrap gap-8 w-full">
                {
                    loading ? (
                        <div className="flex justify-center items-center w-full text-[#EF6C00]">
                            <ClipLoader color="#EF6C00" size={35} />
                        </div>
                    ) : items.length === 0 ? (
                        "No Vendors found"
                    ) : items.map((item, index) => {
                        const isInCart = cart.some(cartItem => cartItem.id === item.id); // Check if item is in cart

                        return (
                            <div key={index} className="w-full bg-white m-2 md:w-[200px] border md:border-none rounded-lg p-2 hover:shadow-lg">
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

                                    <button className="flex gap-2" onClick={() => toggleCart(item.id, !isInCart)}>
                                        <div className="transition-all duration-700 ease-in-out transform hover:scale-125">
                                            {isInCart ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-100 transition-opacity duration-700 ease-in-out">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                                </svg>
                                            )
                                        : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-100 transition-opacity duration-700 ease-in-out">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="8" x2="12" y2="16"></line>
                                                <line x1="8" y1="12" x2="16" y2="12"></line>
                                            </svg>
                                        ) }
                                        </div>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            {isOverlayVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`bg-white p-6 rounded-md shadow-md text-center transform transition-all duration-500 ease-out ${isOverlayVisible ? 'scale-100 translate-y-0' : 'scale-0 translate-y-full'}`}>
                        <p className="text-lg font-bold">
                            {isAddingToCart ? 'Add this item to your cart?' : 'Remove this item from your cart?'}
                        </p>
                        {
                            isAddingToCart &&
                        <div className="mt-4 flex gap-4 items-center">
                        <p >
                            Amount
                        </p>
                        <input type="number" name="" value={amount} className="border p-2" placeholder="Service Amount" onChange={(elem)=>{setAmount(elem.target.value)}} />
                        </div>
                        }
                        <div className="flex justify-around mt-4">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-300" onClick={handleConfirmAction}>
                               {isAddingToCart ? "Add" : "Remove"}
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-300" onClick={handleCancelAction}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopVendorsCard;
