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

    const editUser = drinker => {
        return fetch(`http://localhost:8000/drinkers/1`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${authToken}`
            },
            body: JSON.stringify(drinker)
        })
    }

    return(
        <UserContext.Provider value={{
            getUser, user, editUser, setUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}