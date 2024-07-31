import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
const [user, setUser] = useState(
    {
        lang: 'en',
        username: null,
        email: null,
        isLoggedIn: true,
        token: null,
        isChatScreen: false,
        id: 2
    }
)
return (<UserContext.Provider value={{user, setUser}}>
    {children}
</UserContext.Provider>);
};