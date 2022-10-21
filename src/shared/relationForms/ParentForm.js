import React, { useState, useEffect } from 'react';
import { MemberSelect } from '../../controls';

// Adding a new parent
export default function ParentForm({ member, contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState();
  const { relations, id } = contextMember;
  const parents = relations.filter((relation) => relation.type === 'parent');
  const parentContextMemberRelations = [
    {
      type: 'child',
      relatedId: contextMember.id,
      memberId: null,
      nullColumn: 'memberId',
    },
    {
      type: 'parent',
      relatedId: null,
      memberId: contextMember.id,
      nullColumn: 'relatedId',
    },
  ];

  useEffect(() => {
    handleOnChange({
      target: {
        name: 'newRelations',
        value: parentContextMemberRelations,
      },
    });
  }, []);

  useEffect(() => {
    if (selectedRelation) {
      setRelations();
    }
  }, [selectedRelation]);

  useEffect(() => {
    if (member.existingMember) {
      handleSelectExisting();
    }
  }, [member.existingMember]);

  const handleChange = ({ target: { value } }) => {
    setSelectedRelation(Number(value));
  };

  function setRelations() {
    handleOnChange({
      target: {
        name: 'newRelations',
        value: [
          // combine parent/child with parent/spouse
          ...parentContextMemberRelations,
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
        ],
      },
    });
  }

  function handleSelectExisting() {
    const parentContextMemberRelations = [
      {
        type: 'parent',
        relatedId: member.existingMember,
        memberId: id,
      },
      {
        type: 'child',
        relatedId: id,
        memberId: member.existingMember,
      },
    ];

    handleOnChange({
      target: {
        name: 'newRelations',
        value: parentContextMemberRelations,
      },
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <MemberSelect
            id="existingMember"
            label="Or choose an existing member"
            handleOnChange={handleOnChange}
            value={member.existingMember}
          />
        </div>
      </div>

      <hr />
      <div className="row">
        <div className="col-md-12">
          <p>Add Parental Spouse (Parent Form)</p>
          <ul className="parentList list-group">
            {parents.map((parent, idx) => (
              <li key={Math.random()} className="list-group-item">
                <input
                  type="radio"
                  name="relationChoice"
                  id={`choice_${idx}`}
                  className="form-check-input"
                  value={parent.id}
                  checked={selectedRelation === parent.id}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={`choice_${idx}`}>
                  {parent.firstName} {parent.lastName}
                </label>
              </li>
            ))}
            {!parents.length ? (
              <li className="list-group-item">No spouses found</li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
}
