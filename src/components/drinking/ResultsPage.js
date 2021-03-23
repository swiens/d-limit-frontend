import React, { useContext, useEffect, useRef, useState } from "react";
import { EventContext } from "../eventDrinks/EventDrinkProvider";
import moment from "moment";
import { UserContext } from "../user/UserProvider";
import "./drinking.css"

export const ResultsPage = (props) => {
  const { endEvent, getEventDrinks, eventDrinks, event, getEvent } = useContext(
    EventContext
  );
  const { user, getUser } = useContext(UserContext);
  const [result, setResult] = useState(0)
  
  const eventId = parseInt(props.match.params.eventId);

  useEffect(() => {
    getUser().then(
      getEvent().then(
        getEventDrinks(eventId)
      )
    );
  }, []);

  // this useEffect is watching my variables, user, event, eventDrinks to see if they change in value
  //for my calculation
  useEffect(() => {
    //this is where i will do my calculations
    // get hours since event started 
    const now = moment()
    const startTime = moment(event.start_time)
    const timeSinceEventInHours = now.diff(startTime, "hours", true)
    // according to Widmark calculation. Metabolising rate is -0.015 every hour that goes by.
    const bacTimeAdjust = 0.015
    const timeAdjustForBac = timeSinceEventInHours * bacTimeAdjust

    console.log(timeSinceEventInHours)
    const bodyWeightInGrams = user.weight * 454
    const alcoholConsumedInGrams = eventDrinks.length * 14
    const gender = 0.55
    const BAC = ((alcoholConsumedInGrams / (bodyWeightInGrams * gender))  * 100) - timeAdjustForBac
    setResult(BAC.toFixed(3))
  }, [user, event, eventDrinks])



  const endEventButton = () => {
    endEvent(eventId).then(() => {
      return props.history.push("/");
    });
  };

  const continueDrinkingButton = () => {
    return props.history.push(`/drinking/${eventId}`);
  };

  if(result<0.08) {
      return(
        <section>
        <h1 class="results--title">Results</h1>
        <h2>You are good to drive, your Blood Alcohol Concentration is {result}</h2>
        <button class="continue--drinking--button" onClick={continueDrinkingButton}>Continue Drinking</button>
        <button class="end--drinking--button" onClick={endEventButton}>End Event</button>
      </section>
      )

  }
  else {
    return (
        <section>
          <h1 class="results--title">Results </h1>
          <h2> You Can't drive, your Blood Acohol Concentration is {result}</h2>
          <button class="continue--drinking--button" onClick={continueDrinkingButton}>Continue Drinking</button>
          <button class="end--drinking--button" onClick={endEventButton}>End Event</button>
        </section>
      );
  }
  
};
