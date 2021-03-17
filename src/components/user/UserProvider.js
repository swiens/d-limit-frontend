import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState({})
    
    const getUser = () => {
        const userId = localStorage.getItem("app_user_id")
        return fetch(`http://localhost:8088/users/${userId}`)
            .then(res => res.json())
            .then(setUser)
    }

    return(
        <UserContext.Provider value={{
            getUser, user
        }}>
            {props.children}
        </UserContext.Provider>
    )
}