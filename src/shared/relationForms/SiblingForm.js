import React, { useState, useEffect } from "react";

// Adding a new sibling and updating selected siblings
export default function SiblingForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState([]);
  const { relations } = contextMember;
  const siblings = relations.filter((relation) => relation.type === "sibling");

  /**
   *
   *
   * This creates the proper sibling 1:1 but doesn't create Parent relations
   * Need to test sibling checkboxes
   *
   */

  useEffect(() => {
    // contextMember/new sibling relationship
    const relations = [];

    // new sibling/parent relationships
    const parents = contextMember.relations.filter(
      (relation) => relation.type === "parent"
    );

    // loop over existing parents and create relationships
    parents?.forEach((parent) => {
      relations.push(
        {
          type: "parent",
          relatedId: parent.id,
          memberId: null,
          nullColumn: "memberId",
        },
        {
          type: "child",
          relatedId: null,
          memberId: parent.id,
          nullColumn: "relatedId",
        }
      );
    });

    relations.push(
      {
        type: "sibling",
        relatedId: contextMember.id,
        memberId: null,
        nullColumn: "memberId",
      },
      {
        type: "sibling",
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
    selectedRelation.forEach((siblingId) => {
      relations.push(
        {
          type: "sibling",
          relatedId: siblingId,
          memberId: null,
          nullColumn: "memberId",
        },
        {
          type: "sibling",
          relatedId: null,
          memberId: siblingId,
          nullColumn: "relatedId",
        }
      );
    });

    console.log(relations);

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
          <label htmlFor="">Include these individuals as siblings, too:</label>
          <ul className="relationList list-group">
            {siblings.map((sibling, idx) => (
              <li key={idx} className="list-group-item">
                <input
                  type="checkbox"
                  name="relationChoice"
                  id={`choice_${idx}`}
                  className="form-check-input"
                  value={selectedRelation}
                  onClick={() =>
                    setSelectedRelation((prev) => [...prev, sibling.id])
                  }
                />
                <label className="form-check-label" htmlFor={`sibling_${idx}`}>
                  {sibling.firstName} {sibling.lastName}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
