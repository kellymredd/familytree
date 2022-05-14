import React, { useState, useEffect } from "react";
import EventForm from "../shared/EventForm";
import EventSectionDisplay from "./EventSectionDisplay";
import httpEventService from "../hooks/eventService";
import NoItemFound from "./NoItemsFound";

export default function EventSection({ UserId, user }) {
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const { listEvents, saveEvent, deleteEvent } = httpEventService();
  const newEvent = {
    Type: "",
    Date: "",
    City: "",
    State: "",
    County: "",
    Country: "United States",
    UserId,
  };
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    if (UserId) {
      listEvents(UserId).then((response) => setEvents(response));
    }
  }, [UserId]);

  useEffect(() => {
    if (currentEvent) {
      setModalOpen(true);
    } else {
      setEventType("");
      setModalOpen(false);
    }
  }, [currentEvent]);

  function setFormAndMemberType(eventType) {
    setCurrentEvent({ ...newEvent, Type: eventType });
    // setModalOpen(true);
  }

  function cancelEvent() {
    setCurrentEvent(null);
    // setEventType("");
    // setModalOpen(false);
  }

  function handleDelete(id) {
    const filtered = events.filter((ev) => ev.id !== id);
    setEvents(filtered);
    deleteEvent(id);
  }

  function save(event) {
    const { id } = event;
    saveEvent(event, user).then((response) => {
      // setModalOpen(false);
      setCurrentEvent(null);
      // setEventType("");
      setEvents((prev) => {
        if (id) {
          let filtered = prev.filter((ev) => ev.id !== id);
          return [...filtered, event];
        }
        return [...prev, response];
      });
    });
  }

  return (
    <>
      <div className="col profileListing eventListing">
        <header>
          <h3>Life Events</h3>
          <select
            className="form-select form-select-sm"
            name="familyType"
            id="familyType"
            value={eventType}
            onChange={({ target }) => setFormAndMemberType(target.value)}
          >
            <option value="">Add Event</option>
            <option value="Birth">Birth</option>
            <option value="Death">Death</option>
            <option value="Marriage">Marriage</option>
          </select>
        </header>

        {events
          ?.sort((a, b) => {
            // new Date(date).toLocaleDateString("en-US");
            const aDate = a.Date;
            const bDate = b.Date;

            if (aDate > bDate) {
              return 1;
            }
            if (aDate < bDate) {
              return -1;
            }

            return 0;
          })
          ?.map((event, idx) => (
            <div key={idx} className="col">
              <EventSectionDisplay
                handleCancel={cancelEvent}
                {...{ setCurrentEvent, event, UserId, handleDelete }}
              />
            </div>
          ))}
        {!events.length && <NoItemFound itemType="events" />}
      </div>
      {modalOpen ? <div className="my-modal-cover"></div> : null}
      {modalOpen ? (
        <div className="my-modal">
          <EventForm
            event={currentEvent}
            handleSave={save}
            handleCancel={cancelEvent}
          />
        </div>
      ) : null}
    </>
  );
}
