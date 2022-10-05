import React, { useState, useEffect } from 'react';

// Adding a new child
export default function ChildrenForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState();
  const { relations } = contextMember;
  const spouses = relations.filter((relation) => relation.type === 'spouse');

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
    values.forEach((parentId) => {
      related.push(
        {
          type: 'parent',
          relatedId: parentId,
          memberId: null,
          nullColumn: 'memberId',
        },
        {
          type: 'child',
          relatedId: null,
          memberId: parentId,
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
          <p className="required">
            Include these members as parents of this child: (Children Form)
          </p>
          <ul className="parentList list-group">
            {spouses.map((spouse, idx) => (
              <li key={Math.random()} className="list-group-item">
                <input
                  type="radio"
                  name="newRelations"
                  id={`choice_${idx}`}
                  className="form-check-input"
                  value={spouse.id}
                  checked={selectedRelation === spouse.id}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor={`choice_${idx}`}>
                  {contextMember.firstName} {contextMember.lastName} and{' '}
                  {spouse.firstName} {spouse.lastName}
                </label>
              </li>
            ))}
            <li className="list-group-item">
              <input
                type="radio"
                name="newRelations"
                id="choice_unknown"
                className="form-check-input"
                value={contextMember.id}
                checked={selectedRelation === contextMember.id}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="choice_unknown">
                {contextMember.firstName} {contextMember.lastName} and Unknown
                Parent
              </label>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
