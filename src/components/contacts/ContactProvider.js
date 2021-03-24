import React, { useState, useEffect } from "react"

export const ContactContext = React.createContext()

const authToken = localStorage.getItem("lu_token")

export const ContactProvider = (props) => {
    const [contacts, setContacts] = useState([])
    const [currentContact, setCurrentContact] = useState([])

    const getContacts = () => {
        return fetch(`http://localhost:8000/contacts`, {
            headers: {
                Authorization: `Token ${authToken}`
            }
        })
            .then(res => res.json())
            .then(setContacts)
    }

    const addContact = contact => {
        return fetch("http://localhost:8000/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${authToken}`
            },
            body: JSON.stringify(contact)
        })
    }

    const editContact = contact => {
        return fetch(`http://localhost:8000/contacts/${contact.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${authToken}`
            },
            body: JSON.stringify(contact)
        })
    }

    const getContact = contactId => {
        return fetch(`http://localhost:8000/contacts/${contactId}`, {
            headers: {
                Authorization: `Token ${authToken}`
            }
        }) 
            .then(res => res.json())
            .then(setCurrentContact)
        
    }

    return(
        <ContactContext.Provider value={{
            contacts, addContact, getContacts, editContact, currentContact, getContact, setCurrentContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}