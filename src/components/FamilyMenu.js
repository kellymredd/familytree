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
            members?.map((member, idx) => (
              <li key={idx}>
                <Link
                  to={`/${member.id}`}
                  title={`View ${member.firstName}'s profile`}
                >
                  {member.lastName}, {member.firstName} {member.middleName}
                </Link>
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
