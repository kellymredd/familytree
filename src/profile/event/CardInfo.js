import React, { useState } from 'react';
import listData from '../../utils/staticLists';

function displayDate(date) {
  const options = {
    timeZone: 'UTC',
  };
  return new Date(date).toLocaleDateString('en-US', options);
}

function Note({ note }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="cardNoteWrapper">
      <button
        className="expandNoteBtn"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? 'Close Notes' : 'View Notes'}
      </button>
      {open ? <textarea className="cardNote" value={note}></textarea> : null}
    </div>
  );
}

export default function CardInfo({ event }) {
  if (!event) {
    return {};
  }

  const info = {
    cityText: listData.cities.find((c) => c.value === +event.city).label,
    countryText: listData.countries.find((c) => c.value === +event.country)
      .label,
    countyText: listData.counties.find((c) => c.value === +event.county).label,
    stateProvinceText: listData.states.find(
      (c) => c.value === +event.stateProvince
    ).label,
  };

  return (
    <>
      {displayDate(event.dateOfEvent)} &bull; {info.cityText}
      {info.countyText && `, ${info.countyText}`}
      {info.stateProvinceText && `, ${info.stateProvinceText}`}
      {info.countryText && `, ${info.countryText}`}
      <div className="row">
        <div className="col-md-12">
          {event?.note ? <Note note={event.note} /> : null}
        </div>
      </div>
    </>
  );
}
