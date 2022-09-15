import React, { useState, useEffect } from "react";

// Adding a new parent
export default function ParentForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState("");
  const { relations } = contextMember;

  const parents = relations.filter((relation) => relation.type === "parent");

  useEffect(() => {
    // contextMember/new parent relationship
    const relations = [];
    relations.push(
      {
        type: "child",
        relatedId: contextMember.id,
        memberId: null, // member.id server-side
        nullColumn: "memberId",
      },
      {
        type: "parent",
        relatedId: null, // member.id serverv-side
        memberId: contextMember.id,
        nullColumn: "relatedId",
      }
    );

    handleOnChange((prev) => ({
      ...prev,
      newRelations: relations,
    }));
  }, []);

  useEffect(() => {
    if (selectedRelation) {
      setRelations();
    }
  }, [selectedRelation]);

  function setRelations() {
    const relations = [];

    relations.push(
      {
        type: "spouse",
        relatedId: selectedRelation,
        memberId: null, // member.id server-side
        nullColumn: "memberId",
      },
      {
        type: "spouse",
        relatedId: null, // member.id serverv-side
        memberId: selectedRelation,
        nullColumn: "relatedId",
      }
    );

    handleOnChange((prev) => ({
      ...prev,
      newRelations: [...prev.newRelations, ...relations],
    }));
  }

  return (
    <>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="">Add Parental Spouse</label>
          <ul className="parentList list-group">
            {parents.map((parent, idx) => (
              <li key={idx} className="list-group-item">
                <input
                  type="radio"
                  name="relationChoice"
                  id={`choice_${idx}`}
                  className="form-check-input"
                  value={selectedRelation}
                  onClick={() => setSelectedRelation(parent.id)}
                />
                <label className="form-check-label" htmlFor={`choice_${idx}`}>
                  {parent.firstName} {parent.lastName}
                </label>
              </li>
            ))}
            {!parents.length ? "No existing spouses found" : null}
          </ul>
        </div>
      </div>
    </>
  );
}
