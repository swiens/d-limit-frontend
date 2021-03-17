import React, { useContext, useEffect } from "react"
import { ContactContext } from "./ContactProvider"
import { Link } from "react-router-dom"
import "./contact.css"

export const ContactList = props => {
    const { contacts, getContacts } = useContext(ContactContext)

    useEffect(() => {
        getContacts()
    }, [])

    return (
        <div className="contacts">
            <h1 className="contacts-title">Contacts</h1>

            <button onClick={() => props.history.push("/create-contact")}>
                Create Contact
            </button>

            <button onClick={() => props.history.push("/")}>
                Home Page
            </button>

            <article className="contactList">
                {
                    contacts.map(contact => {
                        return <Link key={contact.id} to={`/contacts/${contact.id}`}>
                            <h3>{contact.name}</h3>
                            <h3>{contact.phoneNumber}</h3>
                        </Link>
                    })
                }
            </article>
        </div>
    )
}