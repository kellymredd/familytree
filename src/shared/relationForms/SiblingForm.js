import React, { useState } from 'react';

// Adding a new sibling and create parent relations
export default function SiblingForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState([]);
  const { relations } = contextMember;
  const parents = relations.filter((relation) => relation.type === 'parent');

  function setParentRelations(value) {
    setSelectedRelation(value);

    const relations = [];
    parents.forEach((parent) => {
      relations.push(
        {
          type: 'parent',
          relatedId: parent.id,
          memberId: null, // member.id server-side
          nullColumn: 'memberId',
        },
        {
          type: 'child',
          relatedId: null, // member.id serverv-side
          memberId: parent.id,
          nullColumn: 'relatedId',
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
      <div className="row">
        <div className="col-md-12">
          <p>Parents</p>
          <ul className="relationList list-group">
            <li className="list-group-item">
              <input
                type="checkbox"
                name="relationChoice"
                id="choice"
                className="form-check-input"
                value={selectedRelation}
                onClick={() => setParentRelations(parents)}
              />
              <label className="form-check-label" htmlFor="choice">
                {parents
                  .map((p) => `${p.firstName} ${p.lastName}`)
                  .join(' and ')}
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
