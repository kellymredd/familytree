import React from 'react';
import { Link } from 'react-router-dom';
import listData from '../../utils/staticLists';

const setChildType = (gender) => (gender === '1' ? 'daughter' : 'son');
const setParentType = (gender) => (gender === '1' ? 'mother' : 'father');
const setSiblingType = (gender) => (gender === '1' ? 'sister' : 'brother');
const setSpouseType = (gender) => (gender === '1' ? 'wife' : 'husband');

function setGender({ type, gender }) {
  switch (type) {
    case 'child': {
      return setChildType(gender);
    }
    case 'parent': {
      return setParentType(gender);
    }
    case 'spouse': {
      return setSpouseType(gender);
    }
    case 'siblings': {
      return setSiblingType(gender);
    }

    default:
      break;
  }
}

export default function CardHeader({ event, contextMemberId }) {
  if (!event) {
    return {};
  }

  const isSelf = event.memberId === contextMemberId;
  const type = +event.typeOfEvent;
  const typeOfEvent = listData.eventTypes.find((c) => c.value === type).label;
  const info = {
    typeOfEventText: typeOfEvent,
    relationType: event.relationType, // spouse, child, parent
    relationGender: setGender({
      type: event.relationType,
      gender: event.relationGender,
    }),
    relatedMember: event.name,
  };

  switch (type) {
    case 1: {
      const text = isSelf ? (
        'Born'
      ) : (
        <>
          Birth of {info.relationGender}{' '}
          <Link to={`/${event.memberId}`}>{info.relatedMember}</Link>
        </>
      );
      return text;
    }
    case 2: {
      const text = isSelf ? (
        'Death'
      ) : (
        <>
          Death of {info.relationGender}{' '}
          <Link to={`/${event.memberId}`}>{info.relatedMember}</Link>
        </>
      );
      return text;
    }
    case 3: {
      return (
        <>
          Divorce from{' '}
          {isSelf ? (
            info.relatedMember
          ) : (
            <Link to={`/${event.memberId}`}>{info.relatedMember}</Link>
          )}
        </>
      );
    }
    case 4: {
      return (
        <>
          Marriage to{' '}
          {isSelf ? (
            info.relatedMember
          ) : (
            <Link to={`/${event.memberId}`}>{info.relatedMember}</Link>
          )}
        </>
      );
    }
    default: {
      return '';
    }
  }
}
