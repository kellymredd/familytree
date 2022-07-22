import React, { useState, useEffect } from "react";
import MemberForm from "../shared/MemberForm";

export default function CreateScreen({
  initialMember,
  handleCancel,
  handleSave,
  memberType,
  contextMember,
}) {
  const [member, setMember] = useState();

  useEffect(() => {
    let initial = initialMember;
    initial.lastName = contextMember?.lastName;
    if (memberType === "spouse") {
      initial.spouseId = contextMember?.id;
      initial.type = contextMember?.gender === 2 ? "Wife" : "Husband";
      initial.gender = contextMember?.gender === 2 ? 1 : 2;
    } else if (memberType === "siblings") {
      initial.fatherId = contextMember.fatherId;
      initial.motherId = contextMember.motherId;
    } else if (memberType === "children") {
      initial.type = "Child";
      initial.fatherId =
        contextMember?.gender === 2 ? contextMember.id : contextMember.spouseId;
      initial.motherId =
        contextMember?.gender === 1 ? contextMember.id : contextMember.spouseId;
    } else if (memberType === "parents") {
      if (contextMember?.parents.length === 1) {
        initial.spouseId = contextMember?.parents[0].id;
      }
    }

    setMember({
      ...initial,
      memberType,
      contextMember,
    });
  }, []);

  const updateFormFields = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {member ? (
        <MemberForm
          member={member}
          title={`Add ${memberType}`}
          onChange={updateFormFields}
          {...{ handleCancel, handleSave, memberType }}
        />
      ) : null}
    </>
  );
}
