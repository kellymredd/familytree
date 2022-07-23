import React from "react";
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
  handleEdit,
}) {
  return (
    <div className="displayItem">
      <div className="row ">
        <div className="col-10">
          <div className="event-item-title">
            <b>{event.typeOfEventText}</b> {displayDate(event.dateOfEvent)}
          </div>
          <div>
            {event.cityText}, {event.stateProvinceText},{" "}
            {event.countyText && `${event.countyText} Co.`}, {event.countryText}{" "}
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
                onClick={() => handleEdit({ event })}
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
