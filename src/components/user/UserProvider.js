import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState({})

    const authToken = localStorage.getItem("lu_token")

    const getUser = () => {
        return fetch(`http://localhost:8000/drinkers/1`, {
            headers: {
                Authorization: `Token ${authToken}`
            }
        })
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