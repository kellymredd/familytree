import React, { useState, useEffect } from 'react';

// Adding a new parent
export default function ParentForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState();
  const { relations } = contextMember;
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

  const handleChange = ({ target: { value } }) => {
    setSelectedRelation(Number(value));
  };

  function loopValues(values) {
    const related = [];

    // React is stupid
    if (!values.includes(contextMember.id)) {
      values.push(contextMember.id);
    }

    // array
    values.forEach((id) => {
      related.push(
        {
          type: 'spouse',
          relatedId: id,
          memberId: null,
          nullColumn: 'memberId',
        },
        {
          type: 'spouse',
          relatedId: null,
          memberId: id,
          nullColumn: 'relatedId',
        }
      );
    });

    return related;
  }

  function setRelations() {
    handleOnChange({
      target: {
        name: 'newRelations',
        value: loopValues([selectedRelation]),
      },
    });
  }

  return (
    <>
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
