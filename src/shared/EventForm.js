import React, { useState } from "react";
import { Input, Select, Button, DateInput } from "../controls/index";
import states from "../utils/states.js";

export default function EventForm({
  event = {},
  handleSave,
  handleCancel,
  index
}) {
  const [ev, setEv] = useState(event);

  const updateFormFields = (e) => {
    const { name, value } = e.target;
    setEv((prev) => ({
      ...prev,
      [name]: value
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
                id="Type"
                label="Type"
                value={ev.Type}
                onChange={updateFormFields}
                options={[
                  { name: "Birth" },
                  { name: "Death" },
                  { name: "Marriage" }
                ]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <DateInput
                id="Date"
                label="Date"
                value={ev.Date}
                onChange={updateFormFields}
              />
            </div>
            <div className="col-4">
              <Input
                id="City"
                label="City"
                value={ev.City}
                onChange={updateFormFields}
              />
            </div>
            <div className="col-4">
              <Input
                id="County"
                label="County"
                value={ev.County}
                onChange={updateFormFields}
              />
            </div>
            <div className="col-4">
              <Select
                id="State"
                label="State"
                value={ev.State}
                onChange={updateFormFields}
                options={states}
                selectValueKey="code"
                selectLabelKey="name"
                // disabled={usingExisting}
              />
              {/* <Input
                id="State"
                label="State"
                value={ev.State}
                onChange={updateFormFields}
              /> */}
            </div>
            <div className="col-4">
              <Input
                id="Country"
                label="Country"
                value={ev.Country}
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
