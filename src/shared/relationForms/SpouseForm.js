import React, { useState, useEffect, useMemo } from "react";
import CheckboxGroup from "../../controls/CheckboxGroup";
import Checkbox from "../../controls/Checkbox";

// Adding a new spouse and updating selected children
export default function SpouseForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState([]);
  const { relations, id } = contextMember;
  const spouseChildren = [];

  const children = useMemo(
    () =>
      relations
        .map((relation) => {
          if (relation.type === "spouse" && relation?.spouseChildren.length) {
            return relation?.spouseChildren;
          }
          return null;
        })
        .filter((n) => Boolean(n)),
    [contextMember]
  );

  children.forEach((c) => {
    spouseChildren.push(...c);
  });

  useEffect(() => {
    // contextMember/new Spouse relationship
    const relations = [];
    relations.push(
      {
        type: "spouse",
        relatedId: id,
        memberId: null,
        nullColumn: "memberId",
      },
      {
        type: "spouse",
        relatedId: null,
        memberId: id,
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
    // this just keeps pusing rechecked values onto the stack
    // it doesn't remove from array when unchecked
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
      newRelations: [...prev.newRelations, ...relations],
    }));
  }

  function handleCheck(updated) {
    setSelectedRelation(updated);
    // const { checked, value } = e.target;
    // const newValue = Number(value);

    // if (checked) {
    //   setSelectedRelation((prev) => {
    //     return [...prev, newValue];
    //   });
    // } else {
    //   setSelectedRelation((prev) => {
    //     const updated = prev.filter((c) => c !== newValue);
    //     return updated;
    //   });
    // }
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
              onChange={handleCheck}
            >
              {(getCheckboxProps) =>
                spouseChildren.map((item, idx) => {
                  return (
                    <li key={Math.random()} className="list-group-item">
                      <Checkbox
                        id={`choice_${idx}`}
                        {...getCheckboxProps(item.id)}
                        label={`${item.firstName} ${item.lastName}`}
                      />
                    </li>
                  );
                })
              }
            </CheckboxGroup>
          </ul>
        </div>
      </div>
    </>
  );
}
