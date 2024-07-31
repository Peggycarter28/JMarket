import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {


let data =  {
    lang: 'en',
    username: null,
    email: null,
    isLoggedIn: true,
    token: null,
    isChatScreen: false,
    id: 0
}

switch (data.username) {
    case 'barakat':
        data.id = 2
        break;

    case 'aren':
        data.id = 1
        break

    default:
        break;
}

const [user, setUser] = useState(data)

return (<UserContext.Provider value={{user, setUser}}>
    {children}
</UserContext.Provider>);
};