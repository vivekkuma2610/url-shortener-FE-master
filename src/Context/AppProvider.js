import React, { createContext, useContext, useState } from "react";


export const AppContext = createContext(null)

export default function AppProvider({children}){
    const [url,setUrl] = useState(null)
    const [userData,setUserData] = useState(null)
    
    return(
        <AppContext.Provider
        value={{
           url,
           setUrl,
           userData,
           setUserData
        }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const AppState = ()=>{
    return useContext(AppContext)
}