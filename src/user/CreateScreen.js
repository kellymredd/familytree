import React, { useState } from "react";
import MemberForm from "../shared/MemberForm";

export default function CreateScreen({
  initialMember,
  handleCancel,
  handleSave,
  handleSaveById,
  memberType,
  contextMember
}) {
  const [user, setUser] = useState(() => {
    let initial = initialMember;
    initial.LastName = contextMember.LastName;
    if (memberType === "spouse") {
      initial.Spouse = contextMember.id;
      initial.Type = contextMember.Gender === "Male" ? "Wife" : "Husband";
      initial.Gender = contextMember.Gender === "Male" ? "Female" : "Male";
    } else if (memberType === "siblings") {
      initial.Parents = contextMember.Parents;
    } else if (memberType === "children") {
      initial.Type = "Child";
      initial.Parents = [contextMember.id];
      if (contextMember.Spouse) {
        initial.Parents = [...initial.Parents, contextMember.Spouse];
      }
    } else if (memberType === "parents") {
      if (contextMember.Parents.length === 1) {
        initial.Spouse = contextMember.Parents[0];
      }
    }

    return {
      ...initial,
      memberType,
      contextMember
    };
  });

  const updateFormFields = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <MemberForm
        user={user}
        title={`Add ${memberType}`}
        onChange={updateFormFields}
        {...{ handleCancel, handleSave, handleSaveById, memberType }}
      />
    </>
  );
}
