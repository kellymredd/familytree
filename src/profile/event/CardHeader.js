import React from 'react';
import listData from '../../utils/staticLists';

const includeTypes = ['Marriage', 'Divorce'];

export default function CardHeader({ event, relations }) {
  if (!event) {
    return {};
  }

  const type = +event.typeOfEvent;
  const typeOfEvent = listData.eventTypes.find((c) => c.value === type).label;
  const info = {
    typeOfEventText: typeOfEvent,
    relatedMember: includeTypes.includes(typeOfEvent)
      ? relations.find((rel) => rel.type === 'spouse')
      : null,
  };

  return (
    <>
      {info?.typeOfEventText}{' '}
      {info?.relatedMember ? (
        <span>
          - {info.relatedMember.firstName} {info.relatedMember.lastName}
        </span>
      ) : (
        ''
      )}
    </>
  );
}
