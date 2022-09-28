import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMembers from '../hooks/useMembers.hook';
import CreateButtonScreenCombo from '../shared/CreateButtonScreenCombo';

export default function FamilyMenu() {
  const [members, setMembers] = useState(null);
  const { getMembers } = useMembers();

  useEffect(() => {
    getMembers().then((response) => {
      setMembers(response.length ? response : null);
    });
  }, []);
  return (
    <div className="familyMenu flex">
      <p>Family Members</p>
      <div className="familyMenuOverflow">
        <ul>
          {members ? (
            members
              ?.sort((a, b) => {
                const nameA = a.firstName.toUpperCase();
                const nameB = b.firstName.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              })
              ?.map((member, idx) => (
                <li key={idx}>
                  <Link
                    to={`/${member.id}`}
                    title={`View ${member.firstName}'s profile`}
                  >
                    {member.firstName} {member.middleName} {member.lastName}
                  </Link>
                  {/* <Link
                  to={`/${member.id}/edit`}
                  title={`Edit ${member.firstName}'s profile`}
                >
                  <i className="fas fa-pen"></i>
                </Link>{" "}
                {member?.id && (
                  <Link
                    to={`/${member.id}/tree`}
                    title={`View ${member.firstName}'s Familiy Tree`}
                  >
                    View Tree
                  </Link>
                )} */}
                </li>
              ))
          ) : (
            <li className="noMembersFound">
              <p>No Members found for your family.</p>
              <CreateButtonScreenCombo buttonText="Add one here" />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
