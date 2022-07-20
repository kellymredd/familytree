import React, { useState } from "react";
import MemberForm from "../shared/MemberForm";

export default function CreateScreen({
  initialMember,
  handleCancel,
  handleSave,
  handleSaveById,
  memberType,
  contextMember,
}) {
  const [member, setMember] = useState(() => {
    let initial = initialMember;
    initial.lastName = contextMember?.lastName;
    if (memberType === "spouse") {
      initial.spouseId = contextMember?.id;
      initial.type = contextMember?.gender === "Male" ? "Wife" : "Husband";
      initial.gender = contextMember?.gender === "Male" ? "Female" : "Male";
    } else if (memberType === "siblings") {
      initial.parents = contextMember?.parents;
    } else if (memberType === "children") {
      initial.type = "Child";
      initial.parents = [contextMember?.id];
      if (contextMember?.spouse) {
        initial.parents = [...initial.parents, contextMember?.spouse?.[0]?.id];
      }
    } else if (memberType === "parents") {
      if (contextMember?.parents.length === 1) {
        initial.spouseId = contextMember?.parents[0].id;
      }
    }

    return {
      ...initial,
      memberType,
      contextMember,
    };
  });

  const updateFormFields = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <MemberForm
        member={member}
        title={`Add ${memberType}`}
        onChange={updateFormFields}
        {...{ handleCancel, handleSave, handleSaveById, memberType }}
      />
    </>
  );
}
