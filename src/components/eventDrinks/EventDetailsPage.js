
import React from "react";
import { useContext, useEffect } from "react";
import { EventContext } from "../eventDrinks/EventDrinkProvider";
import moment from "moment";

export const EventDetailsPage = (props) => {
  const {
    getEventDrinks,
    eventDrinks,
    getDrinks,
    drinks,
    event,
    getEvent
  } = useContext(EventContext);

  const eventId = parseInt(props.match.params.eventId);

  useEffect(() => {
    getEventDrinks(eventId);
    getDrinks();
    getEvent(eventId);
  }, []);

console.log(event)

  if (drinks.length === 0) return false;
  return (
    <div>
      <h1 className="event-list-title"> Event Details</h1>

      <div>Departure Type: {event.departure}</div>
      <div className="drinks">
        {eventDrinks.map((currentEventDrink) => {
          return (
            <div>
              <hr />
              <div>{currentEventDrink.drink.type} </div>
              <div>
                
                {moment(currentEventDrink.time_drank).format(
                  "LTS"
                )}
              </div>
            </div>
          );
        })}
        <button onClick={() => props.history.push("/")}>
                Home Page
            </button>
      </div>
    </div>
  );
};
