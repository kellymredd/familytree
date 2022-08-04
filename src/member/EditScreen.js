import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Template from "../shared/Template";
import MemberForm from "../shared/MemberForm";
import useMembers from "../hooks/useMembers.hook";
import defaultMember from "../utils/initialMember";

export default function EditScreen() {
  const [member, setMember] = useState(defaultMember);
  const history = useHistory();
  const { id } = useParams();
  const { saveMember, editMember } = useMembers();

  useEffect(() => {
    if (id) {
      editMember(id)
        .then((response) => {
          setMember(response);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const save = (member) => {
    // trim down the payload
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
        <MemberForm
          member={member}
          setMember={setMember}
          handleCancel={cancel}
          handleSave={save}
        />
      </Template.Body>
    </Template>
  );
}
