import { useContext, useEffect, useState } from "react"
import WhiteInGrayContainer from "../../components/Layout/WhiteInGrayContainer"
import { UserContext } from "../../context/AppContextt"
import { useParams } from "react-router-dom"
import { getPhotos, getReviews } from "../../service/reviewService"

const ReviewPhotoGallery = () => {
    const {user, setUser, cart, addToCart, removeFromCart} = useContext(UserContext)

    const { category, title } = useParams()

    const [photos, setPhotos] = useState([])

    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(true);
    const [amount, setAmount] = useState(100)

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
        console.log("Fetching Photo Gallery")

        const fetch = async () => {
            
            const res = await getPhotos(title)

            if (res.status == 200 || res.status == 201) {

                console.log("FOund photos")

                console.log(res.data)

                setPhotos(res.data)
            }
            else { alert("Unable to fetch review photos") }
        }

        fetch()

    }, [])



    return(
        <WhiteInGrayContainer>
        <h3>
            {user.lang == 'ha' ? "Aiki" : "Services"}</h3>

            <ul className="flex w-full flex-wrap">
                {photos.map((photo, index) => {
                    const isInCart = cart.some(cartItem => cartItem.id === photo.id); // Check if item is in cart

                    return(<li key={photo+index} className="w-1/3 border-r mb-8">
                        <div className="p-2 ">
                        <img className="rounded-lg shadow-lg" height={120} width={'auto'} src={photo.image_url} alt={photo.name} />

                        <h3 className="text-[24px] py-6">Service Title {index +1}</h3>
                        <p className="py-2">Service description {index +1}</p>
                       
                       <div className="flex justify-between">
                        <p className="font-bold">NGN2,{index +1}00</p>
                        <button className="flex gap-2" onClick={() => toggleCart(photo.id, !isInCart)}>
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
                        {isOverlayVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`bg-white p-6 rounded-md shadow-md text-center transform transition-all duration-500 ease-out ${isOverlayVisible ? 'scale-100 translate-y-0' : 'scale-0 translate-y-full'}`}>
                        <p className="text-lg font-bold">
                            {isAddingToCart ? 'Add this item to your cart?' : 'Remove this item from your cart?'}
                        </p>
                       
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
                    </li>)
                })}
            </ul>
    </WhiteInGrayContainer>

    )
}

export default ReviewPhotoGallery