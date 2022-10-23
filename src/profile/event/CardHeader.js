import React from 'react';
import listData from '../../utils/staticLists';

const includeTypes = ['Marriage', 'Divorce'];

export default function CardHeader({ event, contextMemberId }) {
  if (!event) {
    return {};
  }

  const type = +event.typeOfEvent;
  const typeOfEvent = listData.eventTypes.find((c) => c.value === type).label;
  const info = {
    typeOfEventText: typeOfEvent,
    relationType: event.relationType,
    relationGender:
      event.relationGender === '1' // female
        ? event.relationType === 'spouse'
          ? 'wife'
          : 'daughter'
        : event.relationType === 'child'
        ? 'son'
        : 'husband',
    relatedMember: event.name,
  };

  switch (type) {
    case 1: {
      const text =
        event.memberId === contextMemberId
          ? 'Born'
          : `Birth of ${info.relationGender} ${info.relatedMember}`;
      return text;
    }
    case 2: {
      return `Death of ${info.relationGender} ${info.relatedMember}`;
    }
    case 3: {
      return `Divorce from ${info.relatedMember}`;
    }
    case 4: {
      return `Marriage to ${info.relatedMember}`;
    }
    default: {
      return '';
    }
  }
}
