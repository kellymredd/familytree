import React, { useState, useEffect } from "react";
import FamilySectionDisplay from "./FamilySectionDisplay";
import useMembers from "../hooks/useMembers.hook";
import CreateScreen from "../member/CreateScreen";
import defaultMember from "../utils/initialMember";

import "./profile.css";

const NotFound = ({ type }) => <li>No {type}</li>;

export default function FamilySection({ member }) {
  const [members, setMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [memberType, setMemberType] = useState();
  const { saveMember } = useMembers();

  useEffect(() => {
    if (member?.relations) {
      const { parents, spouse, children, siblings = [] } = member.relations;
      setMembers({
        parents,
        spouse,
        children,
        siblings: siblings.filter((sib) => sib.id !== member.id),
      });
    }
  }, [member]);

  function cancelMember() {
    setModalOpen(false);
    setMemberType("");
  }

  function setFormAndMemberType(type) {
    setMemberType(type);
    setModalOpen(true);
  }

  async function save(values) {
    setModalOpen(false);
    const savedMember = await saveMember({ member: values });
    setMemberType("");
    setMembers((prev) => {
      const prevMemberType = prev[memberType] ?? [];
      return {
        ...prev,
        [memberType]: [...prevMemberType, savedMember],
      };
    });
  }

  return (
    <div className="column family">
      <header>
        <span>Family</span>
        <select
          className="form-select form-select-sm"
          name="familyType"
          id="familyType"
          value={memberType}
          onChange={({ target }) => setFormAndMemberType(target.value)}
        >
          <option value="">Add Member</option>
          <option value="children">Child</option>
          <option value="parents">Parent</option>
          <option value="siblings">Sibling</option>
          <option value="spouse">Spouse</option>
        </select>
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
        <div className="cardName">Spouse</div>
        <ul className="cardList">
          {members?.spouse?.length ? (
            members.spouse?.map((member, idx) => (
              <li key={idx}>
                <FamilySectionDisplay {...{ member }} />
              </li>
            ))
          ) : (
            <NotFound type="spouse" />
          )}
        </ul>
      </div>

      <div className="card">
        <div className="cardName">Children</div>
        <ul className="cardList">
          {members?.children?.length ? (
            members.children
              .sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth))
              ?.map((member, idx) => (
                <li key={idx}>
                  <FamilySectionDisplay {...{ member }} />
                </li>
              ))
          ) : (
            <NotFound type="children" />
          )}
        </ul>
      </div>

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
