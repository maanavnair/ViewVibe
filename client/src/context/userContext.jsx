import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    //const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [user, setUser] = useState(null);
    
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}