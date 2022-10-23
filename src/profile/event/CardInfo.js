import React from 'react';
import listData from '../../utils/staticLists';

function displayDate(date) {
  const options = {
    timeZone: 'UTC',
  };
  return new Date(date).toLocaleDateString('en-US', options);
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
    </>
  );
}
