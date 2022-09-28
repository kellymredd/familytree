import React, { useState, useEffect } from 'react';

// Adding a new spouse and updating selected children
export default function MarriageForm({ event, handleOnChange }) {
  const [selectedRelationId, setSelectedRelationId] = useState();
  const spouses = event.relations.filter(
    (relation) => relation.type === 'spouse',
  );

  useEffect(() => {
    if (selectedRelationId) {
      setRelation();
    }
  }, [selectedRelationId]);

  function setRelation() {
    handleOnChange((prev) => ({
      ...prev,
      associatedMembers: [event.memberId, selectedRelationId],
    }));
  }

  return (
    <>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="">Select spouse:</label>
          <ul className="relationList list-group">
            {spouses.map((spouse, idx) => (
              <li key={idx} className="list-group-item">
                <input
                  type="radio"
                  name="relationChoice"
                  id={`choice_${idx}`}
                  className="form-check-input"
                  value={selectedRelationId}
                  onClick={() => setSelectedRelationId(spouse.id)}
                />
                <label className="form-check-label" htmlFor={`choice_${idx}`}>
                  {spouse.firstName} {spouse.lastName}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
