import React, { useRef, useContext, useEffect } from "react";
import {ContactContext} from "./ContactProvider"
import "./contact.css"

export const EditContactForm = (props) => {
  //pulling functions and data out of my provider
  const {editContact, currentContact, getContact, setCurrentContact} = useContext(ContactContext)
  
  //reffs that will reference my inputs so i can acces their values
  const name = useRef(null);
  const phoneNumber = useRef(null);

  // useEffect will run one time when the page loads because im passing empty array to it
  useEffect(() => {
      getContact(props.match.params.contactId)
  }, [])

  //function i will use to actually update the current contact
  const editCurrentContact = (e) => {
    e.preventDefault();
    editContact({
      name: name.current.value,
      phoneNumber: phoneNumber.current.value,
      id: currentContact.id,
      userId: parseInt(localStorage.getItem("app_user_id"))
    })
      .then(() => props.history.push("/contacts"))
  }

  const handleControlledInputChange = (event) => {
    /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
    const newCurrentContact = Object.assign({}, currentContact)
    newCurrentContact[event.target.name] = event.target.value
    setCurrentContact(newCurrentContact)
}

  console.log(currentContact)

  return (
    <main style={{ textAlign: "center" }}>
      <form className="contact--form" onSubmit={editCurrentContact}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Edit Contact
        </h1>
        <fieldset>
          <label htmlFor="name"> Name </label>
          <input
            ref={name}
            type="text"
            name="name"
            value={currentContact.name}
            onChange={handleControlledInputChange}
            className="form-control"
            placeholder="Name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="phoneNumber"> Phone Number </label>
          <input
            ref={phoneNumber}
            type="text"
            name="phoneNumber"
            value={currentContact.phoneNumber}
            className="form-control"
            placeholder="Phone Number"
            onChange={handleControlledInputChange}
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Edit Contact </button>
        </fieldset>
      </form>
    </main>
  );
};
