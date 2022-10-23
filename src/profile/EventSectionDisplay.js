import React from 'react';
import { Button } from '../controls/index';
import Card from '../components/Card';
import CardHeader from './event/CardHeader';
import CardInfo from './event/CardInfo';

export default function EventSectionDisplay({
  event,
  handleDelete,
  handleEdit,
  // relations,
  contextMemberId,
}) {
  return (
    <>
      <Card>
        <Card.Header>
          <CardHeader event={event} contextMemberId={contextMemberId} />
        </Card.Header>
        <Card.Info>
          <CardInfo event={event} />
        </Card.Info>
        <Card.Menu>
          {event?.memberId && (
            <>
              <div className="cardToolbar">
                <Button
                  title="Delete this event record"
                  btnStyle="link"
                  role="button"
                  onClick={() => handleDelete(event)}
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
