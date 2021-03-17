import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { EventContext } from "../eventDrinks/EventDrinkProvider";
import "./home.css" 

export const Home = (props) => {
  const { addEvent, getEvents } = useContext(EventContext);

  const currentEventId = localStorage.getItem("currentEvent");

  const startDrinking = () => {
    addEvent().then((newEvent) => {
      return props.history.push(`/drinking/${newEvent.id}`);
    });
  };

  const continueDrinking = () => {
      return props.history.push(`/drinking/${currentEventId}`);
  };

  
  return (
    <section>
      <h1 className="home-title">Home Page</h1>
      <div>
          <Link className="edit-profile-button" to="/edit-profile">Edit Profile</Link>
      </div>
      <div>
          <Link className="edit-contacts-button" to="/contacts">Edit Contacts</Link>
      </div>
      <div>
        {currentEventId && (
          <button className="continue-drinking-button" onClick={continueDrinking} id="continue--drinking">
            Continue Drinking
          </button>
        )}

        {!currentEventId && (
          <button className="start--drinking--button" onClick={startDrinking} id="start--drinking">
            Start Drinking
          </button>
        )}  
      </div>
    </section>
  );
};
