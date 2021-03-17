import React, { useState } from "react";
import moment from "moment"

export const EventContext = React.createContext();

export const EventDrinkProvider = (props) => {
  const [eventDrinks, setEventDrinks] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});

  const getEventDrinks = (eventId) => {
    return fetch(`http://localhost:8088/eventDrinks?eventId=${eventId}`)
      .then((res) => res.json())
      .then(setEventDrinks);
  };
  const getEvents = () => {
    const userId= parseInt(localStorage.getItem("app_user_id"))
    return fetch(`http://localhost:8088/events?userId=${userId}`)
      .then((res) => res.json())
      .then(setEvents);
  };
  const getDrinks = () => {
    return fetch("http://localhost:8088/drinks")
      .then((res) => res.json())
      .then(setDrinks);
  };
  const addEvent = () => {
    return fetch("http://localhost:8088/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: parseInt(localStorage.getItem("app_user_id")),
        startTime: moment.now(),
        endTime: null,
      }),
    }).then((res) => res.json())
      .then((event) => {
        localStorage.setItem("currentEvent",event.id)
        return event 
      })
    
  };
  const endEvent = (eventId) => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        endTime: moment.now(),
      }),
    }).then((res) => res.json())
      .then(() => {
        localStorage.removeItem("currentEvent") 
      })
    
  };

  const getEvent = () => {
    const currentEventId = localStorage.getItem("currentEvent")
    return fetch(`http://localhost:8088/events/${currentEventId}`)
        .then(res => res.json())
        .then(setEvent)
}

  const addEventDrink = (drink) => {
    return fetch("http://localhost:8088/eventDrinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(drink),
    }).then(getEventDrinks);
  };

  const deleteEventDrink = (eventDrinkId, eventId) => {
    return fetch(`http://localhost:8088/eventDrinks/${eventDrinkId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getEventDrinks(eventId));
  };

  return (
    <EventContext.Provider
      value={{
        addEvent,
        eventDrinks,
        getEventDrinks,
        addEventDrink,
        getDrinks,
        drinks,
        deleteEventDrink,
        endEvent,
        getEvents,
        events,
        getEvent,
        event
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};
