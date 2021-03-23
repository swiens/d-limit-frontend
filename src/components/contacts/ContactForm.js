import React, { useRef, useContext, useEffect } from "react";
import {ContactContext} from "./ContactProvider"
import "./contact.css"

export const ContactForm = (props) => {
  const {addContact} = useContext(ContactContext)
  const name = useRef(null);
  const phoneNumber = useRef(null);

  const createNewContact = (e) => {
    e.preventDefault();
    addContact({
      name: name.current.value,
      phone: phoneNumber.current.value
        })
      .then(() => props.history.push("/"))
  }
  return (
    <main style={{ textAlign: "center" }}>
      <form className="contact--form" onSubmit={createNewContact}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Add A Designated Driver Contact
        </h1>
        <fieldset>
          <label htmlFor="name"> Name </label>
          <input
            ref={name}
            type="text"
            name="name"
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
            className="form-control"
            placeholder="Phone Number"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Add Contact </button>
        </fieldset>
      </form>
    </main>
  );
};
