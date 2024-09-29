import NavBar from "./LandingPage/NavBar";
import SignInNav from "./LandingPage/SignInNav";
import siteLogo from '../assets/bauchi-connect-logo.svg';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../context/AppContextt";

const NavBarComponent = () => {
    const { user, setUser, getCartItems } = useContext(UserContext);
    
    const [isCartOpen, setIsCartOpen] = useState(false); // Toggle cart dropdown
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0); // State for total amount
    const cartRef = useRef(null); // Reference to the cart icon

    // Fetch cart items on component mount
    useEffect(() => {
        const items = getCartItems();
        setCartItems(items);
        calculateTotal(items); // Calculate total when items are fetched
    }, [getCartItems]);

    // Calculate total amount
    const calculateTotal = (items) => {
        const totalPrice = items.reduce((acc, item) => {
            return item.amount ? acc + item.amount * item.quantity : acc; // Only add if amount exists
        }, 0);
        setTotal(totalPrice);
    };

    // Toggle the cart dropdown visibility
    const toggleCartDropdown = () => {
        setIsCartOpen(prev => !prev);
    };

    // Close the cart dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isCartOpen && !cartRef.current.contains(event.target)) {
                setIsCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCartOpen]);

    const handleLangUpdate = (lang) => {
        setUser(prev => ({ ...prev, lang: lang }));
    };

    // Adjust position of the dropdown
    const getDropdownStyles = () => {
        const dropdownStyles = { top: '100%', right: '0' }; // Default to below the cart icon on the right
        if (cartRef.current) {
            const rect = cartRef.current.getBoundingClientRect();
            const dropdownHeight = 200; // Set to your dropdown height

            if (window.innerHeight - rect.bottom < dropdownHeight) {
                dropdownStyles.top = `-${dropdownHeight}px`; // Position above
            }
        }
        return dropdownStyles;
    };

    // Handle payment process
    const handlePayment = () => {
        // Logic for handling payment goes here
        console.log("Proceeding to payment...");
    };

    return (
        <div className="flex w-full h-[78px] fixed bg-white left-0 top-0 z-[1000]">
            <div className="flex w-full justify-end absolute top-0 right-0 mt-3 mr-3 index-[45]">
                <select onChange={elem => handleLangUpdate(elem.target.value)} className="text-right" id="">
                    <option value="">..select language</option>
                    <option value="en">English</option>
                    <option value="ha">Hausa</option>
                </select>
            </div>
            <nav className="flex w-full justify-between md:justify-around items-center p-2 md:p-8">
                <Link to={"/"}>
                    <img src={siteLogo} alt="BConnect Logo" />
                </Link>

                <div className='hidden md:flex'>
                    <NavBar links={[
                        { name: user.lang === 'en' ? "Find Vendors" : "Nemi masu siyar wa", url: "/search" },
                        { name: user.lang === 'en' ? 'Vendors' : "Masu siyar wa", url: "/search" }
                    ]} />

                    <SignInNav links={[
                        { name: user.lang === 'en' ? "Sign In" : "Shiga akaunt", url: "auth/signin" },
                        { name: user.lang === 'en' ? "Sign Up" : "Bude sabon akaunt", url: "auth/signup", isPrimary: true },
                    ]} />
                </div>

                <div className="relative cart-icon" ref={cartRef}>
                    {/* Cart Icon */}
                    <div className="cursor-pointer" onClick={toggleCartDropdown}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 5h14m-7-8V6m0 7v2" />
                            <circle cx="9" cy="20" r="1.5" />
                            <circle cx="15" cy="20" r="1.5" />
                        </svg>

                        {/* Cart item count badge */}
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </div>
                </div>
    
                {/* Cart Dropdown */}
                {isCartOpen && (
                    <div 
                        className="absolute cart-dropdown w-64 bg-white border border-gray-300 rounded-md shadow-lg"
                        style={getDropdownStyles()}
                    >
                        <div className="p-4">
                            <h3 className="text-sm font-bold mb-2">Your Cart</h3>

                            {/* If cart is empty */}
                            {cartItems.length === 0 ? (
                                <p className="text-sm text-gray-500">No items in your cart.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {cartItems.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <span className="text-sm">
                                                {item.name} 
                                                {item.amount !== null ? ` ($${item.amount.toFixed(2)})` : " (Price Not Available)"}
                                            </span>
                                            <span className="text-sm font-bold">{item.quantity}x</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="mt-4">
                                <h4 className="text-sm font-bold">Total: ${total.toFixed(2)}</h4>
                            </div>
                            <button 
                                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
                                onClick={handlePayment}
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default NavBarComponent;
