import React, { useState, useEffect } from "react";

// Adding a new spouse and updating selected children
export default function SpouseForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState([]);
  const { relations } = contextMember;
  const children = relations.filter((relation) => relation.type === "child");

  useEffect(() => {
    if (selectedRelation.length) {
      setRelations();
    }
  }, [selectedRelation]);

  function setRelations() {
    const relations = [];
    selectedRelation.forEach((parentId) => {
      relations.push(
        {
          type: "child",
          relatedId: parentId,
          memberId: null, // member.id server-side
          nullColumn: "memberId",
        },
        {
          type: "parent",
          relatedId: null, // member.id serverv-side
          memberId: parentId,
          nullColumn: "relatedId",
        }
      );
    });

    // contextMember/new Spouse relationship
    relations.push(
      {
        type: "spouse",
        relatedId: contextMember.id,
        memberId: null, // member.id server-side
        nullColumn: "memberId",
      },
      {
        type: "spouse",
        relatedId: null, // member.id serverv-side
        memberId: contextMember.id,
        nullColumn: "relatedId",
      }
    );

    // console.log(relations);

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
          <label htmlFor="">
            Include these individuals as children of this spouse:
          </label>
          <ul className="relationList list-group">
            {children.map((child, idx) => (
              <li key={idx} className="list-group-item">
                <input
                  type="checkbox"
                  name="relationChoice"
                  id={`choice_${idx}`}
                  className="form-check-input"
                  value={selectedRelation}
                  onClick={() =>
                    setSelectedRelation((prev) => [...prev, child.id])
                  }
                />
                <label className="form-check-label" htmlFor={`child_${idx}`}>
                  {child.firstName} {child.lastName}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
