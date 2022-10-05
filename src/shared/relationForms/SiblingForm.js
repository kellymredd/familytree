import React, { useState } from 'react';

// Adding a new sibling and create parent relations
export default function SiblingForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState('');
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
          memberId: null,
          nullColumn: 'memberId',
        },
        {
          type: 'child',
          relatedId: null,
          memberId: parent.id,
          nullColumn: 'relatedId',
        }
      );
    });

    // handleOnChange((prev) => ({
    //   ...prev,
    //   newRelations: relations,
    // }));
    handleOnChange({
      target: {
        name: 'newRelations',
        value: relations,
      },
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <p>Include these members as parents of this child:(Sibling Form))</p>
          <ul className="relationList list-group">
            {/* /////// STOPPED HERE */}
            {parents.length ? (
              <li className="list-group-item">
                <input
                  type="checkbox"
                  name="relationChoice"
                  id="choice"
                  className="form-check-input"
                  value={selectedRelation}
                  onChange={() => setParentRelations(parents)}
                />
                <label className="form-check-label" htmlFor="choice">
                  {parents
                    .map((p) => `${p.firstName} ${p.lastName}`)
                    .join(' and ')}
                </label>
              </li>
            ) : (
              <li className="list-group-item">No parents found</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
