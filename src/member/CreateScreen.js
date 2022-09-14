import React, { useState, useEffect } from "react";
import MemberForm from "../shared/MemberForm";

const titles = {
  children: "Child",
  parents: "Parent",
  siblings: "Sibling",
  spouse: "Spouse",
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
    let initial = { ...initialMember };
    initial.lastName = contextMember?.lastName;
    if (memberType === "spouse") {
      // initial.spouseId = contextMember?.id;
      initial.type = contextMember?.gender === "2" ? "Wife" : "Husband";
      initial.gender = contextMember?.gender === "2" ? "1" : "2";
    } else if (memberType === "siblings") {
      initial.type = "";
      // initial.fatherId = contextMember.fatherId;
      // initial.motherId = contextMember.motherId;
    } else if (memberType === "children") {
      initial.type = "Child";
      // initial.fatherId =
      //   contextMember?.gender === "2"
      //     ? contextMember.id
      //     : contextMember.spouseId;
      // initial.motherId =
      //   contextMember?.gender === "1"
      //     ? contextMember.id
      //     : contextMember.spouseId;
    } else if (memberType === "parents") {
      initial.type = "";
      // if (contextMember?.parents.length === 1) {
      //   initial.spouseId = contextMember?.parents[0].id;
      // }
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
