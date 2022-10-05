import React, { useState, useEffect } from 'react';
import { Select } from '../controls/index';
import FamilySectionDisplay from './FamilySectionDisplay';
import useMembers from '../hooks/useMembers.hook';
import CreateScreen from '../member/CreateScreen';
import defaultMember from '../utils/initialMember';
import listData from '../utils/staticLists';

import './profile.css';

const NotFound = ({ type }) => <li>No {type}</li>;

export default function FamilySection({ member }) {
  const [members, setMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [memberType, setMemberType] = useState();
  const { saveMember } = useMembers();
  const { memberTypes } = listData;

  useEffect(() => {
    if (member?.relations) {
      const { relations } = member;
      const spouse = relations.filter((rel) => rel.type === 'spouse');

      setMembers({
        parents: relations.filter((rel) => rel.type === 'parent'),
        spouse,
        siblings: relations.filter((rel) => rel.type === 'siblings'),
        children: spouse.length
          ? null
          : relations.filter((rel) => rel.type === 'child'),
      });
    }
  }, [member]);

  function cancelMember() {
    setModalOpen(false);
    setMemberType('');
  }

  function setFormAndMemberType(type) {
    setMemberType(type);
    setModalOpen(true);
  }

  function moveChildUnderSpouse({ prev, values, member, savedMember }) {
    const parent = values.newRelations.find(
      (nr) => nr.type === 'parent' && nr.relatedId !== member.id
    );
    // todo : move all of this `doAddChild` code into a controllable function
    //        so that it isn't called every save
    const matchedSpouse = prev.spouse.find((sp) => sp.id === parent.relatedId);
    const otherSpouses = prev.spouse.filter((sp) => sp.id !== parent.relatedId);

    return {
      spouse: [
        ...otherSpouses,
        {
          ...matchedSpouse,
          spouseChildren: [...matchedSpouse.spouseChildren, savedMember],
        },
      ],
    };
  }

  async function save(values) {
    setModalOpen(false);
    const savedMember = await saveMember({ member: values });
    setMemberType('');
    setMembers((prev) => {
      const prevMemberType = prev[memberType] ?? [];
      // if memberType is `children` they need to go under the correct Parent grouping
      const doAddChild = memberType === 'children' && prev.spouse.length;

      return {
        ...prev,
        ...(doAddChild &&
          moveChildUnderSpouse({
            prev,
            values,
            member,
            savedMember,
          })),
        ...(memberType !== 'children' && {
          [memberType]: [...prevMemberType, savedMember],
        }),
      };
    });
  }

  return (
    <div className="column family">
      <header>
        <span>Family</span>
        <Select
          className="form-select form-select-sm"
          initialOption="Add Member"
          name="familyType"
          id="familyType"
          value={memberType}
          onChange={({ target }) => setFormAndMemberType(target.value)}
          options={memberTypes}
          selectValueKey="value"
          selectLabelKey="label"
        />
      </header>

      <div className="card">
        <div className="cardName">Parents</div>
        <ul className="cardList">
          {members?.parents?.length ? (
            members.parents
              .sort((a, b) => {
                const aGender = a.gender;
                const bGender = b.gender;

                if (aGender < bGender) {
                  return 1;
                }
                if (aGender > bGender) {
                  return -1;
                }

                return 0;
              })
              ?.map((member, idx) => (
                <li key={idx}>
                  <FamilySectionDisplay {...{ member }} />
                </li>
              ))
          ) : (
            <NotFound type="parents" />
          )}
        </ul>
      </div>

      <div className="card">
        <div className="cardName">Siblings</div>
        <ul className="cardList">
          {members?.siblings?.length ? (
            members.siblings
              .sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth))
              .map((member, idx) => (
                <li key={idx}>
                  <FamilySectionDisplay {...{ member }} />
                </li>
              ))
          ) : (
            <NotFound type="siblings" />
          )}
        </ul>
      </div>

      <div className="card">
        <div className="cardName">Spouses and Children</div>
        <ul className="cardList">
          {members?.spouse?.length ? (
            members.spouse?.map((member, idx) => (
              <li key={idx}>
                <FamilySectionDisplay {...{ member }} />
              </li>
            ))
          ) : (
            <NotFound type="spouses" />
          )}
        </ul>
      </div>

      {members?.children?.length ? (
        <div className="card">
          <div className="cardName">Children</div>
          <ul className="cardList">
            {members.children.map((member, idx) => (
              <li key={idx}>
                <FamilySectionDisplay {...{ member }} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {modalOpen ? <div className="my-modal-cover"></div> : null}
      {modalOpen ? (
        <div className="my-modal">
          <CreateScreen
            initialMember={defaultMember}
            handleCancel={cancelMember}
            handleSave={save}
            memberType={memberType}
            contextMember={member}
          />
        </div>
      ) : null}
    </div>
  );
}
