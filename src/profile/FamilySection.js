import React, { useState, useEffect } from "react";

import FamilySectionDisplay from "./FamilySectionDisplay";
import useMembers from "../hooks/useMembers.hook";
import CreateScreen from "../member/CreateScreen";
import defaultMember from "../utils/initialMember";

import "./profile.css";

const NotFound = ({ type }) => <p>No {type}</p>;

export default function FamilySection({ user }) {
  const [members, setMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [memberType, setMemberType] = useState();
  const { saveMember } = useMembers();

  useEffect(() => {
    if (user?.id) {
      const { parents, spouse, children, siblings = [] } = user;
      setMembers({
        parents,
        spouse,
        children,
        siblings: siblings.filter((sib) => sib.id !== user.id),
      });
    }
  }, [user]);

  function cancelMember() {
    setModalOpen(false);
    setMemberType("");
  }

  function setFormAndMemberType(type) {
    setMemberType(type);
    setModalOpen(true);
  }

  async function save(member) {
    // WHHHYYYYY?!??!
    //const parentColType = user.gender === 2 ? "fatherId" : "motherId";
    const savedUser = await saveMember({ member });
    setMemberType("");
    setModalOpen(false);
    setMembers((prev) => {
      const prevMemberType = prev[memberType] ?? [];
      return {
        ...prev,
        [memberType]: [...prevMemberType, savedUser],
      };
    });
  }

  return (
    <div className="col profileListing familyListing">
      <header>
        <h3>Family</h3>
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
      <div className="col">
        <span>Parents</span>
        <ul>
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
        <span>Siblings</span>
        <ul>
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
        <span>Spouse</span>
        <ul>
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
        <span>Children</span>
        <ul>
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
      {modalOpen && <div className="my-modal-cover"></div>}
      {modalOpen ? (
        <div className="my-modal">
          <CreateScreen
            initialMember={defaultMember}
            handleCancel={cancelMember}
            handleSave={save}
            memberType={memberType}
            contextMember={user}
          />
        </div>
      ) : null}
    </div>
  );
}
