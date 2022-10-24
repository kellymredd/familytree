import React, { useState, useEffect } from 'react';
import { Select } from '../controls/index';
import EventForm from '../shared/EventForm';
import EventSectionDisplay from './EventSectionDisplay';
import useEvents from '../hooks/useEvents.hook';
import NoItemFound from './NoItemsFound';
import listData from '../utils/staticLists';
import Dialog from '../components/dialog/Dialog';
import useDialog from '../components/dialog/useDialog.hook';

export default function EventSection({ member }) {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const { saveEvent, deleteEvent } = useEvents();
  const { eventTypes } = listData;
  const dialog = useDialog();

  const newEvent = {
    city: '',
    country: '1',
    county: '',
    dateOfEvent: '',
    memberId: member.id,
    stateProvince: '',
    typeOfEvent: '',
    relations: member.relations,
  };

  // TODO: Remove marriage/divorce events if contextmember has no spouse
  // only show marriage/divorce events for contextmember
  // ie, looks weird to show `Marriage to Kelly Redd` when viewing Collin's profile
  useEffect(() => {
    if (member?.events) {
      const timelineEvents = [];
      const spouseId = member.relations.find((r) => r.type === 'spouse')?.id;

      [member, ...member.relations].forEach((rel) => {
        const expandedEvents = rel?.events
          ?.map((ev) => {
            if (
              ev.memberId !== spouseId &&
              (ev.typeOfEvent === '3' || ev.typeOfEvent == '4')
            ) {
              return null;
            }

            return {
              ...ev,
              relationType: rel.type,
              relationGender: rel.gender,
              name: `${rel.firstName} ${rel.lastName}`,
            };
          })
          .filter((ee) => ee);

        timelineEvents.push(...(expandedEvents ?? []));
      });

      setEvents(timelineEvents);
    }
  }, [member.id]);

  function cancelEvent() {
    setCurrentEvent(null);
    setModalOpen(false);
  }

  function handleEdit({ event }) {
    // Don't add `relations` if it's not a marriage/divorce type event
    const spouses =
      event.typeOfEvent === '3' || event.typeOfEvent === '4'
        ? member.relations
            .map((r) => (r.type === 'spouse' ? r : null))
            .filter((n) => Boolean(n))
        : [];

    setCurrentEvent({
      ...event,
      relations: spouses,
    });
    setModalOpen(true);
  }

  async function handleDelete(event) {
    const proceed = await dialog
      .displayYesNo({
        message: 'Are you sure you want to delete this event?',
      })
      .catch(() => {});

    if (proceed) {
      const filtered = events.filter((ev) => ev.id !== event.id);
      setEvents(filtered);
      deleteEvent({
        eventId: event.id,
        typeOfEvent: event.typeOfEvent,
        spouseId: member.spouseId,
      }).catch((err) => console.log('Could not delete event: ', err));
    }
  }

  function save(event) {
    const { id } = event;
    setModalOpen(false);
    saveEvent(event).then((/* response */) => {
      // Note: we don't use the response b/c of Sequelize query constraints
      // and since we don't version our data we can continue using the form values
      setCurrentEvent(null);
      setEvents((prev) => {
        if (id) {
          const filtered = prev.filter((ev) => ev.id !== id);
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
                  contextMemberId={member.id}
                  event={event}
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
            setEvent={setCurrentEvent}
            handleSave={save}
            handleCancel={cancelEvent}
            handleDelete={handleDelete}
          />
        </div>
      ) : null}

      <Dialog instance={dialog} />
    </>
  );
}
