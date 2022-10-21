import React from 'react';
// import { Button } from '../controls/index';
import { Link } from 'react-router-dom';
import './profile.css';

export default function FamilySectionDisplay({ member, removeAssociation }) {
  const { firstName, lastName, middleName, id } = member;
  return (
    <>
      <span>
        <Link to={`/${id}`}>
          {firstName} {middleName} {lastName}
        </Link>
        {/* <Button btnStyle="link" onClick={() => removeAssociation(member)}>
          &times;
        </Button> */}
      </span>
      {member?.spouseChildren?.length ? (
        <ul className="cardList">
          {member.spouseChildren
            .sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth))
            ?.map((child, idx) => (
              <li key={idx}>
                <FamilySectionDisplay
                  member={child}
                  removeAssociation={removeAssociation}
                />
              </li>
            ))}
        </ul>
      ) : null}
    </>
  );
}
