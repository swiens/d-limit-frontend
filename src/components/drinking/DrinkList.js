import React from "react";
import { useContext, useEffect } from "react";
import { EventContext } from "../eventDrinks/EventDrinkProvider";
import moment from "moment";
import "./drinking.css"

export const DrinkList = (props) => {
  const {
    getEventDrinks,
    eventDrinks,
    getDrinks,
    drinks,
    deleteEventDrink,
  } = useContext(EventContext);

  const eventId = parseInt(props.match.params.eventId);

  useEffect(() => {
    getEventDrinks(eventId);
    getDrinks();
  }, []);

  const deleteDrinkButton = (event) => {
    const id = event.target.id;
    deleteEventDrink(id, eventId);
  };
  const continueDrinkingButton = () => {
    return props.history.push(`/drinking/${eventId}`);
  };

  if (drinks.length === 0) return false;
  return (
    <div>
      <h1 class="drink-list-title"> Drink List</h1>

      <button class="continue--drinking--button" onClick={continueDrinkingButton}>Continue Drinking</button>

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
              <button class="delete-drink-button" onClick={deleteDrinkButton} id={currentEventDrink.id}>
                Delete Drink{" "}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
