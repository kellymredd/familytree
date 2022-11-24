import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Template from '../shared/Template';
import EventSection from './EventSection';
import FamilySection from './FamilySection';
import useMembers from '../hooks/useMembers.hook';
import staticLists from '../utils/staticLists';

const calcAge = (dob, dod) => {
  const calcDate = dod ? new Date(dod) : new Date();
  return Math.floor((calcDate - new Date(dob).getTime()) / 3.15576e10);
};

export default function ProfileScreen() {
  const [member, setMember] = useState({});
  const { getMember } = useMembers();
  const { id } = useParams();
  const { gender, status, suffix } = staticLists;

  useEffect(() => {
    async function fetch() {
      const response = await getMember(id).catch((err) =>
        console.log('Error fetching member: ', err)
      );
      setMember(response ?? {});
    }

    if (id) {
      fetch();
    }
  }, [id]);

  return (
    <>
      <Template>
        <Template.Head>
          <h2>
            {member.firstName} {member.middleName} {member.lastName}
            {member.maidenName && ` (${member.maidenName})`}
            {/* {member.suffix && `, ${member.suffix ? 'Jr.' : 'Sr.'}`} */}
            {member.suffix && `, ${suffix[member.suffix].label}`}
            {id && (
              <Link to={`${id}/edit`}>
                <i className="fa fa-pen"></i>
              </Link>
            )}
          </h2>
          <span>
            {member?.status && `${status[member.status - 1].label}`},{' '}
            {member.dateOfBirth &&
              `${calcAge(member.dateOfBirth, member.dateOfDeath)} years old`}
            {member.dateOfBirth && ', '}
            {member?.gender && `${gender[member.gender - 1].label}`}
            {/* {new Date(member.dateOfBirth).toLocaleDateString()} - $
            {new Date(member.dateOfDeath).toLocaleDateString()}`} */}
          </span>
        </Template.Head>
        <Template.Body>
          <EventSection member={member} />
          <FamilySection member={member} />
        </Template.Body>
      </Template>
    </>
  );
}
