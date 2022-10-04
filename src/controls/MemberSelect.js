import React, { useState, useEffect } from 'react';
import Select from './Select';
import useMembers from '../hooks/useMembers.hook';

export default function MemberSelect({ handleOnChange, ...props }) {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const { membersSelect } = useMembers();

  useEffect(async () => {
    const resp = await membersSelect();

    setMembers(resp);
  }, []);

  useEffect(async () => {
    if (selectedMember.length) {
      handleOnChange(selectedMember);
    }
  }, [selectedMember]);

  return (
    <Select
      selectValueKey="id"
      selectLabelKey={['lastName', 'firstName']}
      {...props}
      value={selectedMember}
      onChange={({ target }) => setSelectedMember(target.value)}
      options={members}
    />
  );
}
