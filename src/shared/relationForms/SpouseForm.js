import React, { useState, useEffect } from "react";
import CheckboxGroup from "../../controls/CheckboxGroup";
import Checkbox from "../../controls/Checkbox";

// Adding a new spouse and updating selected children
export default function SpouseForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState([]);
  const { relations } = contextMember;
  const spouseChildren = [];
  const children = relations
    .map((relation) => {
      if (relation.type === "spouse" && relation?.spouseChildren.length) {
        return relation?.spouseChildren;
      }
      return null;
    })
    .filter((n) => Boolean(n));

  children.forEach((c) => {
    spouseChildren.push(...c);
  });

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
          <p>Include these individuals as children of this spouse:</p>
          <ul className="relationList list-group">
            <CheckboxGroup
              name={`choice`}
              value={selectedRelation}
              onChange={(updatedValue) => setSelectedRelation(updatedValue)}
            >
              {(getCheckboxProps) =>
                spouseChildren.map((item, idx) => (
                  <li key={item.id} className="list-group-item">
                    <Checkbox
                      id={`choice_${idx}`}
                      {...getCheckboxProps(item.id)}
                      label={`${item.firstName} ${item.lastName}`}
                    />
                  </li>
                ))
              }
            </CheckboxGroup>
          </ul>
        </div>
      </div>
    </>
  );
}

{
  /* <input
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
  ))} */
}
