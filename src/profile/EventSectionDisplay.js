import React from "react";
import { Button } from "../controls/index";

function setEventTitle(type) {
  let title;
  switch (type) {
    case "Birth":
      title = "Born";
      break;
    case "Marriage":
      title = "Married";
      break;
    case "Death":
      title = "Died";
      break;
    default:
      title = "--";
      break;
  }

  return title;
}

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
  UserId,
}) {
  return (
    <div className="displayItem">
      <div className="row ">
        <div className="col-10">
          <div className="event-item-title">
            <b>{setEventTitle(event.Type)}</b> {displayDate(event.Date)}
          </div>
          <div>
            {event.City}, {event.State}, {event.County && `${event.County} Co.`}
            , {event.Country}{" "}
          </div>
        </div>
        {UserId && (
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
