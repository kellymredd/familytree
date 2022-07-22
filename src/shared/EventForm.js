import React, { useState } from "react";
import { Select, Button, DateInput } from "../controls/index";
import listData from "../utils/staticLists";

export default function EventForm({
  event = {},
  handleSave,
  handleCancel,
  index,
}) {
  const [ev, setEv] = useState(event);
  const { cities, counties, countries, eventTypes, states } = listData;

  const updateFormFields = (e) => {
    const { name, value } = e.target;
    setEv((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>{event?.id ? "Edit" : "Add"} Event</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <Select
                id="type"
                label="Type of Event"
                value={event?.typeOfEvent}
                onChange={updateFormFields}
                options={eventTypes}
                selectValueKey="value"
                selectLabelKey="label"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <DateInput
                id="dateOfEvent"
                label="Date of Event"
                value={ev.dateOfEvent}
                onChange={updateFormFields}
              />
            </div>
            <div className="col-4">
              <Select
                id="city"
                label="City"
                value={ev.city}
                options={cities}
                selectValueKey="value"
                selectLabelKey="label"
                onChange={updateFormFields}
              />
            </div>
            <div className="col-4">
              <Select
                id="county"
                label="County"
                value={ev.county}
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
                value={ev.stateProvince}
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
                value={ev.country}
                options={countries}
                selectValueKey="value"
                selectLabelKey="label"
                onChange={updateFormFields}
              />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-end">
            <Button btnStyle="link" onClick={() => handleCancel(index)}>
              Close
            </Button>
            <Button btnStyle="primary" onClick={() => handleSave(ev)}>
              Save Event
            </Button>
          </div>
        </div>
      </div>
      {/* TEMP: fixed footer padding */}
      <div style={{ height: "15px" }}></div>
    </>
  );
}
