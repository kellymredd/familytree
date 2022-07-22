import React, { useEffect } from "react";
import { Button } from "../controls/index";

function displayDate(date) {
  const options = {
    timeZone: "UTC",
  };
  return new Date(date).toLocaleDateString("en-US", options);
}
export default function EventSectionDisplay({
  event,
  handleDelete,
  setCurrentEvent,
}) {
  return (
    <div className="displayItem">
      <div className="row ">
        <div className="col-10">
          <div className="event-item-title">
            {/* <b>{setEventTitle(event.typeOfEvent)}</b>{" "} */}
            <b>{event.typeOfEvent}</b> {displayDate(event.dateOfEvent)}
          </div>
          <div>
            {event.city}, {event.stateProvince},{" "}
            {event.county && `${event.county} Co.`}, {event.country}{" "}
          </div>
        </div>
        {event?.memberId && (
          <>
            <div className="col-2">
              <Button
                title="Delete this event record"
                btnStyle="link"
                role="button"
                onClick={() => handleDelete(event.id)}
              >
                <i className="fas fa-trash"></i>
              </Button>

              <Button
                title="Edit this event record"
                btnStyle="link"
                role="button"
                onClick={() => setCurrentEvent(event)}
              >
                <i className="fas fa-pen"></i>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
