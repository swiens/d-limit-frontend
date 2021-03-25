import React, {useContext, useEffect} from "react"
import {EventContext} from "./EventDrinkProvider"
import {Event} from "./Event"


export const EventList = () => {
    const {events, getEvents} = useContext(EventContext)

    useEffect(() => {
        getEvents()
    } , [])

    // useEffect(() => {

    // }, [events])
    return(
        <div className="events">
        <h3 className="previous-events"> Previous Events </h3>

            {
                events.map(e => <Event key={e.id} event={e} />)
            }
        </div>
    )
}
