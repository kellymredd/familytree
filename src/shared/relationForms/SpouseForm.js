import React, { useState, useEffect, useMemo } from 'react';
import { MemberSelect, CheckboxGroup, Checkbox } from '../../controls';

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
    () =>
      relations
        .map((relation) => {
          if (relation.type === 'spouse' && relation?.spouseChildren.length) {
            return relation?.spouseChildren;
          }
          // also list children who haven't been associated to a spouse
          // note: this causes dupes b/c they can also exist for both parents
          if (relation.type === 'child') {
            return [relation];
          }

          return null;
        })
        .filter((n) => Boolean(n)),
    [contextMember]
  );

  children.forEach((c) => {
    spouseChildren.push(...c);
    // .reduce((result, current) => {
    //   const found = result.find((r) => r.id === current.id);
    //   console.log(current);
    //   return found ?? result;
    // }, []);
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
        }
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

  function handleSelectExisting(existingId) {
    const spouseContextMemberRelations =
      existingId !== '0'
        ? [
            {
              type: 'spouse',
              relatedId: existingId,
              memberId: id,
              nullColumn: 'memberId',
            },
            {
              type: 'spouse',
              relatedId: id,
              memberId: existingId,
              nullColumn: 'relatedId',
            },
          ]
        : [];

    handleOnChange((prev) => {
      // remove existing spouse objects before applying new
      const rmvdSpouses = prev?.newRelations?.filter(
        (p) => p.type !== 'spouse'
      );

      return {
        ...prev,
        useExistingMember: existingId !== '0' ? existingId : null,
        newRelations: [...rmvdSpouses, ...spouseContextMemberRelations],
      };
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <MemberSelect
            id="ExistingMember"
            label="Or choose an existing member"
            handleOnChange={handleSelectExisting}
          />
        </div>
      </div>

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
              {(getCheckboxProps) =>
                spouseChildren.map((item, idx) => (
                  <li key={Math.random()} className="list-group-item">
                    <Checkbox
                      id={`choice_${idx}`}
                      {...getCheckboxProps(item.id)}
                      label={`${item.firstName} ${item.middleName} ${item.lastName}`}
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
