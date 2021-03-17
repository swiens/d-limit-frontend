import React from "react"
import moment from "moment"
import {Link} from "react-router-dom"

export const Event = ({ event }) => (
    <section className="event">
        <div className="event__date"></div>
        <Link class="event-detail-button" to={`/event/detail/${event.id}`}>{moment(parseInt(event.startTime)).format("ll")}</Link>
    </section>
)