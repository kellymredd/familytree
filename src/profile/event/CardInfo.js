import React from 'react';
import listData from '../../utils/staticLists';

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
      {info.cityText}, {info.stateProvinceText},{' '}
      {info.countyText && `${info.countyText} Co.`}, {info.countryText}{' '}
    </>
  );
}
