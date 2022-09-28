import React, { useState, useEffect } from 'react';

// Adding a new parent
export default function ParentForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState('');
  const { relations } = contextMember;

  const parents = relations.filter((relation) => relation.type === 'parent');
  const parentContextMemberRelations = [
    {
      type: 'child',
      relatedId: contextMember.id,
      memberId: null, // member.id server-side
      nullColumn: 'memberId',
    },
    {
      type: 'parent',
      relatedId: null, // member.id serverv-side
      memberId: contextMember.id,
      nullColumn: 'relatedId',
    },
  ];

  useEffect(() => {
    // contextMember/new parent relationship
    handleOnChange((prev) => ({
      ...prev,
      newRelations: parentContextMemberRelations,
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
        type: 'spouse',
        relatedId: selectedRelation,
        memberId: null,
        nullColumn: 'memberId',
      },
      {
        type: 'spouse',
        relatedId: null,
        memberId: selectedRelation,
        nullColumn: 'relatedId',
      },
    );

    handleOnChange((prev) => ({
      ...prev,
      newRelations: [...relations, ...parentContextMemberRelations],
    }));
  }

  return (
    <>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <p>Add Parental Spouse</p>
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
            {!parents.length ? <li>No spouses found</li> : null}
          </ul>
        </div>
      </div>
    </>
  );
}
