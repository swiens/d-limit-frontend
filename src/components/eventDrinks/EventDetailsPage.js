
import React from "react";
import { useContext, useEffect } from "react";
import { EventContext } from "../eventDrinks/EventDrinkProvider";
import moment from "moment";

export const EventDetailsPage = (props) => {
  const {
    getEventDrinks,
    eventDrinks,
    getDrinks,
    drinks
  } = useContext(EventContext);

  const eventId = parseInt(props.match.params.eventId);

  useEffect(() => {
    getEventDrinks(eventId);
    getDrinks();
  }, []);



  if (drinks.length === 0) return false;
  return (
    <div>
      <h1 className="event-list-title"> Event Details</h1>

      
      <div className="drinks">
        {eventDrinks.map((currentEventDrink) => {
          const foundDrink = drinks.find((currentDrink) => {
            return currentDrink.id === currentEventDrink.drinkId;
          });
          return (
            <div>
              <hr />
              <div>{foundDrink.type} </div>
              <div>
                
                {moment(parseInt(currentEventDrink.timeDrank)).format(
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
