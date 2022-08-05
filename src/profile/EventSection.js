import React, { useState, useEffect } from "react";
import { Select } from "../controls/index";
import EventForm from "../shared/EventForm";
import EventSectionDisplay from "./EventSectionDisplay";
import useEvents from "../hooks/useEvents.hook";
import NoItemFound from "./NoItemsFound";
import listData from "../utils/staticLists";
import Dialog from "../components/dialog/Dialog";
import useDialog from "../components/dialog/useDialog.hook";

// this needs to retain integer values for editing the event
// just add the `display` texts as separate values and use in UI
function map(ev) {
  if (!ev) {
    return {};
  }
  return {
    ...ev,
    cityText: listData.cities.find((c) => c.value === +ev.city).label,
    countryText: listData.countries.find((c) => c.value === +ev.country).label,
    countyText: listData.counties.find((c) => c.value === +ev.county).label,
    stateProvinceText: listData.states.find(
      (c) => c.value === +ev.stateProvince
    ).label,
    typeOfEventText: listData.eventTypes.find(
      (c) => c.value === +ev.typeOfEvent
    ).label,
  };
}

export default function EventSection({ member }) {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const { getEvents, saveEvent, deleteEvent } = useEvents();
  const { eventTypes } = listData;
  const dialog = useDialog();

  const newEvent = {
    city: "",
    country: "1",
    county: "",
    dateOfEvent: "",
    memberId: member.id,
    stateProvince: "",
    typeOfEvent: "",
  };

  useEffect(() => {
    if (member.id) {
      getEvents(member.id).then((response) => setEvents(response));
    }
  }, [member.id]);

  function cancelEvent() {
    setCurrentEvent(null);
    setModalOpen(false);
  }

  function handleEdit({ event }) {
    setCurrentEvent(event);
    setModalOpen(true);
  }

  async function handleDelete(event) {
    const proceed = await dialog
      .displayYesNo({
        message: "Are you sure you want to delete this event?",
      })
      .catch(() => {});

    if (proceed) {
      const filtered = events.filter((ev) => ev.id !== event.id);
      setEvents(filtered);
      deleteEvent({
        eventId: event.id,
        typeOfEvent: event.typeOfEvent,
        spouseId: member.spouseId,
      }).catch((err) => console.log("Could not delete event: ", err));
    }
  }

  function save(event) {
    const { id } = event;
    setModalOpen(false);
    saveEvent({ event, spouseId: member.spouseId }).then((/*response*/) => {
      // Note: we don't use the response b/c of sequelize query constraints
      // and since we don't version our data just continue using the form values
      setCurrentEvent(null);
      setEvents((prev) => {
        if (id) {
          let filtered = prev.filter((ev) => ev.id !== id);
          return [...filtered, event];
        }
        return [...prev, event];
      });
    });
  }

  return (
    <>
      <div className="column events">
        <header>
          <span>Events</span>
          <Select
            className="form-select form-select-sm"
            name="familyType"
            id="familyType"
            value={currentEvent?.typeOfEvent}
            initialOption="Add Event"
            onChange={({ target }) =>
              handleEdit({ event: { ...newEvent, typeOfEvent: target.value } })
            }
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
                <EventSectionDisplay
                  key={idx}
                  event={map(event)}
                  {...{ handleEdit, handleDelete }}
                />
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

      <Dialog instance={dialog} />
    </>
  );
}
