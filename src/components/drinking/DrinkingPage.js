import React, {useContext,useEffect, useRef} from "react"
import {EventContext} from "../eventDrinks/EventDrinkProvider"
import moment from "moment"
import "./drinking.css"


export const DrinkingPage = (props) => {
    const {addEventDrink, drinks, getDrinks} = useContext(EventContext)

    const drink = useRef(null)
    const eventId = parseInt(props.match.params.eventId)
    useEffect(() => {
        getDrinks()
    }, [])
// i need to get an event id
    const eventDrink = (event) => {
        const drinkId = parseInt(event.target.id)
        
        const newEventDrink = {
            drink_id: drinkId,
            event_id: eventId,
        }
        addEventDrink(newEventDrink)
    
    }

    const editDrinks = () => {
        return props.history.push(`/drinking/drinks/${eventId}`);
    };

    const canIDriveButton = () => {
        return props.history.push(`/drinking/results/${eventId}`);
    };

    return(
    
        <section>
        <h1 class="what-are-you-drinking-title">What are you drinking?</h1> 
        {
            drinks.map(d => (
                <div>
                <button class="alcohol--choice--button" onClick={eventDrink} key={d.id} ref={drink} value={d.id} id={d.id}>
                    {d.type}
                </button>
                </div>
            ))

        }
        <button class="can-i-drive-button" onClick={canIDriveButton}>Can I drive?</button>
        <button class="edit-drinks-button" onClick={editDrinks}>View/Edit Drinks</button>
        </section>
    )
}
