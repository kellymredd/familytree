import React, { useState, useEffect } from 'react';
import MemberForm from '../shared/MemberForm';

const titles = {
  children: 'Child',
  parents: 'Parent',
  siblings: 'Sibling',
  spouse: 'Spouse',
};

function transformTitle(title) {
  return titles[title];
}

export default function CreateScreen({
  initialMember,
  handleCancel,
  handleSave,
  memberType,
  contextMember,
}) {
  const [member, setMember] = useState();

  useEffect(() => {
    const initial = { ...initialMember };
    initial.lastName = contextMember?.lastName;
    if (memberType === 'spouse') {
      initial.type = contextMember?.gender === '2' ? 'Wife' : 'Husband';
      initial.gender = contextMember?.gender === '2' ? '1' : '2';
    } else if (memberType === 'siblings') {
      initial.type = '';
    } else if (memberType === 'children') {
      initial.type = 'Child';
    } else if (memberType === 'parents') {
      initial.type = '';
    }

    setMember({
      ...initial,
      memberType,
      contextMember,
    });
  }, []);

  return (
    <>
      {member ? (
        <MemberForm
          member={member}
          setMember={setMember}
          title={`Add a ${transformTitle(memberType)}`}
          {...{ handleCancel, handleSave, memberType }}
        />
      ) : null}
    </>
  );
}
