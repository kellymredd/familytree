import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Template from '../shared/Template';
import MemberForm from '../shared/MemberForm';
import useMembers from '../hooks/useMembers.hook';
// import defaultMember from "../utils/initialMember";

export default function EditScreen() {
  const [member, setMember] = useState();
  const history = useHistory();
  const { id } = useParams();
  const { saveMember, editMember } = useMembers();

  useEffect(async () => {
    if (id) {
      const resp = await editMember(id).catch((error) => console.log(error));
      setMember(resp);
    }
  }, [id]);

  const save = (member) => {
    // trim down the payload
    // eslint-disable-next-line no-unused-vars
    const { children, parents, siblings, ...rest } = member;
    saveMember({ member: rest })
      .then(() => {
        history.push(`/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancel = () => {
    history.push(`/${id}`);
  };

  return (
    <Template>
      <Template.Head>
        <h2>Edit Member</h2>
      </Template.Head>
      <Template.Body>
        {member ? (
          <MemberForm
            member={member}
            setMember={setMember}
            handleCancel={cancel}
            handleSave={save}
          />
        ) : null}
      </Template.Body>
    </Template>
  );
}
