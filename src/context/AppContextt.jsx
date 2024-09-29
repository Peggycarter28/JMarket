import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Initial user data
    const initialUserData = {
        lang: 'en',
        username: null,
        email: null,
        isLoggedIn: true,
        token: null,
        isChatScreen: false,
        id: 0,
    };

    // Set user ID based on username
    switch (initialUserData.username) {
        case 'barakat':
            initialUserData.id = 2;
            break;

        case 'aren':
            initialUserData.id = 1;
            break;

        default:
            break;
    }

    const [user, setUser] = useState(initialUserData);
    const [cart, setCart] = useState([]); // Cart state to hold items

    // Function to add an item to the cart
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Function to remove an item from the cart by id
    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };

    // Function to get cart items
    const getCartItems = () => {
        return cart;
    };

    return (
        <UserContext.Provider value={{ user, setUser, cart, addToCart, removeFromCart, getCartItems }}>
            {children}
        </UserContext.Provider>
    );
};
