import React, { useState, useEffect } from "react";

// Adding a new child
export default function ChildrenForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState();
  const { relations } = contextMember;
  const spouses = relations.filter((relation) => relation.type === "spouse");

  useEffect(() => {
    if (selectedRelation) {
      setParentRelations();
    }
  }, [selectedRelation]);

  function setParentRelations() {
    const relations = [];
    selectedRelation.forEach((parentId) => {
      relations.push(
        {
          type: "parent",
          relatedId: parentId,
          memberId: null, // member.id server-side
          nullColumn: "memberId",
        },
        {
          type: "child",
          relatedId: null, // member.id serverv-side
          memberId: parentId,
          nullColumn: "relatedId",
        }
      );
    });

    handleOnChange((prev) => ({
      ...prev,
      newRelations: relations,
    }));
  }

  return (
    <>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="">Parents</label>
          <ul className="parentList list-group">
            {spouses.map((spouse, idx) => (
              <li key={idx} className="list-group-item">
                <input
                  type="radio"
                  name="relationChoice"
                  id={`choice_${idx}`}
                  className="form-check-input"
                  value={selectedRelation}
                  onClick={() =>
                    setSelectedRelation([contextMember.id, spouse.id])
                  }
                />
                <label className="form-check-label" htmlFor={`choice_${idx}`}>
                  {contextMember.firstName} {contextMember.lastName} and{" "}
                  {spouse.firstName} {spouse.lastName}
                </label>
              </li>
            ))}
            <li className="list-group-item">
              <input
                type="radio"
                name="relationChoice"
                id="choice_unknown"
                className="form-check-input"
                value={selectedRelation}
                onClick={() => setParentRelations(`${contextMember.id}`)}
              />
              <label className="form-check-label" htmlFor="choice_unknown">
                {contextMember.firstName} {contextMember.lastName} and Unknown
                Parent
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
