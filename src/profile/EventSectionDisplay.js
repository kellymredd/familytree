import React from "react";
import { Button } from "../controls/index";
import Card from "../components/Card";

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
    <>
      <Card>
        <Card.Header>{event.typeOfEventText}</Card.Header>
        <Card.Info>{displayDate(event.dateOfEvent)}</Card.Info>
        <Card.Info>
          {event.cityText}, {event.stateProvinceText},{" "}
          {event.countyText && `${event.countyText} Co.`}, {event.countryText}{" "}
        </Card.Info>
        <Card.Menu>
          {event?.memberId && (
            <>
              <div className="cardToolbar">
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
        </Card.Menu>
      </Card>
      {/* <div className="card">
        <div className="cardName">{event.typeOfEventText}</div>
        <div className="cardInfo">{displayDate(event.dateOfEvent)}</div>
        <div className="cardInfo">
          {event.cityText}, {event.stateProvinceText},{" "}
          {event.countyText && `${event.countyText} Co.`}, {event.countryText}{" "}
        </div>
        {event?.memberId && (
          <>
            <div className="cardToolbar">
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
      </div> */}
    </>
  );
}
