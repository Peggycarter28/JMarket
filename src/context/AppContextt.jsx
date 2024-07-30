import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
const [user, setUser] = useState(
    {
        lang: 'en',
        name: "Barakat Abdullahi",
        email: "baraka@gmail.com",
    }
)
return (<UserContext.Provider value={{user, setUser}}>
    {children}
</UserContext.Provider>);
};