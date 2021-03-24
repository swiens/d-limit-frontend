import React, { useRef, useContext, useEffect } from "react";
import {UserContext} from "./UserProvider"

export const EditUserForm = (props) => {
  //pulling functions and data out of my provider
  const {user, getUser, editUser, setUser} = useContext(UserContext)
  console.log(user)
  //reffs that will reference my inputs so i can acces their values
  const age = useRef(1);
  const weight = useRef(null);
  const height = useRef(null);

  // useEffect will run one time when the page loads because im passing empty array to it
  useEffect(() => {
      getUser()
  }, [])

  //function i will use to actually update the current contact
  const editCurrentUser = (e) => {
    e.preventDefault();
    editUser({
      age: age.current.value,
      weight: weight.current.value,
      height: height.current.value
    })
      .then(() => props.history.push("/"))
  }

  const handleControlledInputChange = (event) => {
    /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
    const newUser = Object.assign({}, user)
    newUser[event.target.name] = event.target.value
    setUser(newUser)
  }
  return (
    <main style={{ textAlign: "center" }}>
      <form className="contact--form" onSubmit={editCurrentUser}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Edit Your Profile
        </h1>
        <fieldset>
          <label htmlFor="age"> Age </label>
          <input
            ref={age}
            type="text"
            name="age"
            value={user.age}
            className="form-control"
            placeholder="Age"
            onChange={handleControlledInputChange}
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="weight"> Weight </label>
          <input
            ref={weight}
            type="text"
            name="weight"
            value={user.weight}
            className="form-control"
            placeholder="weight"
            onChange={handleControlledInputChange}
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="height"> Height </label>
          <input
            ref={height}
            type="text"
            name="height"
            value={user.height}
            className="form-control"
            placeholder="height"
            onChange={handleControlledInputChange}
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <button type="submit"> Edit Profile </button>
        </fieldset>
      </form>
    </main>
  );
};
