import React, { useState, useEffect, useMemo } from 'react';
import CheckboxGroup from '../../controls/CheckboxGroup';
import Checkbox from '../../controls/Checkbox';

// Adding a new spouse and updating selected children
export default function SpouseForm({ contextMember, handleOnChange }) {
  const [selectedRelation, setSelectedRelation] = useState([]);
  const { relations, id } = contextMember;
  const spouseChildren = [];
  const spouseContextMemberRelations = [
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
    },
  ];

  const children = useMemo(
    () => relations
      .map((relation) => {
        if (relation.type === 'spouse' && relation?.spouseChildren.length) {
          return relation?.spouseChildren;
        }
        if (relation.type === 'child') {
          return [relation];
        }
        return null;
      })
      .filter((n) => Boolean(n)),
    [contextMember],
  );

  children.forEach((c) => {
    spouseChildren.push(...c);
  });

  useEffect(() => {
    // contextMember/new Spouse relationship
    handleOnChange((prev) => ({
      ...prev,
      newRelations: spouseContextMemberRelations,
    }));
  }, []);

  useEffect(() => {
    setRelations();
  }, [selectedRelation]);

  function setRelations() {
    const relations = [];
    selectedRelation.forEach((childId) => {
      relations.push(
        {
          type: 'child',
          relatedId: childId,
          memberId: null,
          nullColumn: 'memberId',
        },
        {
          type: 'parent',
          relatedId: null,
          memberId: childId,
          nullColumn: 'relatedId',
        },
      );
    });

    handleOnChange((prev) => ({
      ...prev,
      newRelations: [...relations, ...spouseContextMemberRelations],
    }));
  }

  function handleCheck(updated) {
    setSelectedRelation(updated);
  }

  return (
    <>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <p>Include these individuals as children of this spouse:</p>
          <ul className="relationList list-group">
            <CheckboxGroup
              name={'choice'}
              value={selectedRelation}
              onChange={handleCheck}
            >
              {(getCheckboxProps) => spouseChildren.map((item, idx) => (
                  <li key={Math.random()} className="list-group-item">
                    <Checkbox
                      id={`choice_${idx}`}
                      {...getCheckboxProps(item.id)}
                      label={`${item.firstName} ${item.lastName}`}
                    />
                  </li>
              ))
              }
            </CheckboxGroup>
            {!spouseChildren.length ? <li>No children found</li> : null}
          </ul>
        </div>
      </div>
    </>
  );
}
