/**
 *
 *
 * Including selected kids when adding a Spouse needs to be tested
 *
 *
 *
 */

import React, { useState, useEffect } from "react";

// Adding a new spouse and updating selected children
export default function SpouseForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState([]);
  const { relations } = contextMember;
  const children = relations.filter((relation) => relation.type === "child");

  useEffect(() => {
    // contextMember/new Spouse relationship
    const relations = [];
    relations.push(
      {
        type: "spouse",
        relatedId: contextMember.id,
        memberId: null,
        nullColumn: "memberId",
      },
      {
        type: "spouse",
        relatedId: null,
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
          memberId: null,
          nullColumn: "memberId",
        },
        {
          type: "parent",
          relatedId: null,
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
                <label className="form-check-label" htmlFor={`choice_${idx}`}>
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
