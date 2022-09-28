import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';

export default function FamilySectionDisplay({ member }) {
  const {
    firstName, lastName, middleName, id,
  } = member;
  return (
    <>
      <Link to={`/${id}`}>
        {firstName} {middleName} {lastName}
      </Link>
      {member?.spouseChildren?.length ? (
        <ul className="cardList">
          {member.spouseChildren
            .sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth))
            ?.map((child, idx) => (
              <li key={idx}>
                <FamilySectionDisplay member={child} />
              </li>
            ))}
        </ul>
      ) : null}
    </>
  );
}
