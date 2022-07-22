import React, { useState, useEffect } from "react";
import { Select } from "../controls/index";
import EventForm from "../shared/EventForm";
import EventSectionDisplay from "./EventSectionDisplay";
import useEvents from "../hooks/useEvents.hook";
import NoItemFound from "./NoItemsFound";
import listData from "../utils/staticLists";

function map(ev) {
  if (!ev) {
    return {};
  }
  return {
    ...ev,
    city: listData.cities.find((c) => c.value === ev.city).label,
    country: listData.counties.find((c) => c.value === ev.country).label,
    county: listData.counties.find((c) => c.value === ev.county).label,
    stateProvince: listData.states.find((c) => c.value === ev.stateProvince)
      .label,
    typeOfEvent: listData.eventTypes.find((c) => c.value === ev.typeOfEvent)
      .label,
  };
}

export default function EventSection({ member }) {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const { getEvents, saveEvent, deleteEvent } = useEvents();
  const { eventTypes } = listData;
  const newEvent = {
    city: null,
    country: 1,
    county: null,
    dateOfEvent: null,
    memberId: member.id,
    stateProvince: null,
    typeOfEvent: null,
  };

  useEffect(() => {
    if (member.id) {
      getEvents(member.id).then((response) => setEvents(response));
    }
  }, [member.id]);

  function setFormAndMemberType(eventType) {
    setCurrentEvent({ ...newEvent, typeOfEvent: eventType });
    setModalOpen(true);
  }

  function cancelEvent() {
    setCurrentEvent(null);
    setModalOpen(false);
  }

  function handleDelete(id) {
    const filtered = events.filter((ev) => ev.id !== id);
    setEvents(filtered);
    deleteEvent(id);
  }

  function save(event) {
    const { id } = event;
    saveEvent({ event, member }).then((response) => {
      setModalOpen(false);
      setCurrentEvent(null);
      setEvents((prev) => {
        if (id) {
          let filtered = prev.filter((ev) => ev.id !== id);
          return [...filtered, response];
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
          <Select
            className="form-select form-select-sm"
            name="familyType"
            id="familyType"
            value={currentEvent?.typeOfEvent}
            initialOption="Add Event"
            onChange={({ target }) => setFormAndMemberType(target.value)}
            options={eventTypes}
            selectValueKey="value"
            selectLabelKey="label"
          />
        </header>

        {events?.length
          ? events
              ?.sort((a, b) => {
                const aDate = a.dateOfEvent;
                const bDate = b.dateOfEvent;

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
                    event={map(event)}
                    {...{ setCurrentEvent, handleDelete }}
                  />
                </div>
              ))
          : null}
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
