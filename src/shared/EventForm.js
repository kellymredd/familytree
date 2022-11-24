import React from 'react';
import { Select, Button, DateInput, Textarea } from '../controls/index';
import MarriageForm from './relationForms/MarriageForm';
import listData from '../utils/staticLists';

const marriageType = ['3', '4'];

export default function EventForm({
  event = {},
  handleSave,
  handleCancel,
  setEvent,
  handleDelete,
}) {
  const { cities, counties, countries, eventTypes, states } = listData;
  const showMarriageForm = marriageType.includes(event.typeOfEvent);

  const updateFormFields = (e) => {
    const { name, value } = e.target;

    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateLocationInfo = (e, selOption) => {
    const { name, value } = e.target;

    setEvent((prev) => ({
      ...prev,
      [name]: value,
      ...selOption?.info,
    }));
  };

  return (
    <div className="formWrapper">
      <h3>{event?.id ? 'Edit' : 'Add'} Event</h3>
      <form name="eventForm" id="eventForm">
        <div className="formBody">
          <div className="row">
            <div className="col-4">
              <Select
                id="typeOfEvent"
                label="Type of Event"
                value={event?.typeOfEvent}
                onChange={updateFormFields}
                options={eventTypes}
                selectValueKey="value"
                selectLabelKey="label"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <DateInput
                id="dateOfEvent"
                label="Date of Event"
                value={event.dateOfEvent}
                onChange={updateFormFields}
                required
              />
            </div>
            <div className="col-4">
              <Select
                id="city"
                label="City"
                value={event.city}
                options={cities}
                selectValueKey="value"
                selectLabelKey="label"
                onChange={updateLocationInfo}
              />
            </div>
            <div className="col-4">
              <Select
                id="county"
                label="County"
                value={event.county}
                options={counties}
                selectValueKey="value"
                selectLabelKey="label"
                onChange={updateFormFields}
              />
            </div>
            <div className="col-4">
              <Select
                id="stateProvince"
                label="State"
                value={event.stateProvince}
                onChange={updateFormFields}
                options={states}
                selectValueKey="value"
                selectLabelKey="label"
              />
            </div>
            <div className="col-4">
              <Select
                id="country"
                label="Country"
                value={event.country}
                options={countries}
                selectValueKey="value"
                selectLabelKey="label"
                onChange={updateFormFields}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Textarea
                id="note"
                label="Note"
                value={event.note}
                onChange={updateFormFields}
              />
            </div>
          </div>
          {showMarriageForm ? (
            <MarriageForm event={event} handleOnChange={setEvent} />
          ) : null}
        </div>
        <div className="formFooter">
          {event.id ? (
            <Button
              btnStyle="danger"
              onClick={() => handleDelete(event)}
              type="submit"
            >
              Delete Event
            </Button>
          ) : null}
          <span>
            <Button btnStyle="link" onClick={() => handleCancel()}>
              Close
            </Button>
            <Button
              btnStyle="primary"
              onClick={() => handleSave(event)}
              type="submit"
            >
              Save Event
            </Button>
          </span>
        </div>
      </form>
    </div>
  );
}
