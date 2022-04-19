import React, { useState, useEffect } from "react";

import FamilySectionDisplay from "./FamilySectionDisplay";
import httpUserService from "../hooks/userService";
import httpFamilyService from "../hooks/familyService";
import CreateScreen from "../user/CreateScreen";

import "./profile.css";

const NotFound = ({ type }) => <p>No {type}</p>;

export default function FamilySection({ user }) {
  const [members, setMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [memberType, setMemberType] = useState();
  const { saveUser } = httpUserService();
  const { listFamily } = httpFamilyService();
  const initialMember = {
    id: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Suffix: "",
    Gender: "",
    Status: "Living",
    Parents: [],
    Spouse: ""
  };

  useEffect(() => {
    if (user?.id) {
      listFamily(user).then((response) => {
        const [parents, spouse, children, siblings = []] = response;
        setMembers({
          parents,
          spouse,
          children,
          siblings: siblings.filter((sib) => sib.id !== user.id)
        });
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
    const savedUser = await saveUser(member);
    setMemberType("");
    setModalOpen(false);
    setMembers((prev) => {
      const prevMemberType = prev[memberType] ?? [];
      return {
        ...prev,
        [memberType]: [...prevMemberType, savedUser]
      };
    });

    // saveUser(member).then((response) => {
    //   setModalOpen(false);
    //   setMembers((prev) => {
    //     const prevMemberType = prev[memberType] ?? [];
    //     return {
    //       ...prev,
    //       [memberType]: [...prevMemberType, response]
    //     };
    //   });
    // });
  }

  async function saveById({ id, memberType }) {
    const savedUser = await saveUser({
      // entity: { id },
      id,
      memberType,
      contextMember: user
    });

    setModalOpen(false);
    setMembers((prev) => {
      const prevMemberType = prev[memberType] ?? [];
      return {
        ...prev,
        [memberType]: [...prevMemberType, savedUser]
      };
    });

    // saveUser(member).then((response) => {
    //   setModalOpen(false);
    //   setMembers((prev) => {
    //     const prevMemberType = prev[memberType] ?? [];
    //     return {
    //       ...prev,
    //       [memberType]: [...prevMemberType, response]
    //     };
    //   });
    // });
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
          {members?.parents ? (
            members.parents
              .sort((a, b) => {
                const aGender = a.Gender;
                const bGender = b.Gender;

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
              .sort((a, b) => new Date(a.DOB) - new Date(b.DOB))
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
          {members?.spouse ? (
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
              .sort((a, b) => new Date(a.DOB) - new Date(b.DOB))
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
      {modalOpen && (
        <div className="my-modal">
          <CreateScreen
            {...{ initialMember }}
            title={`Add ${memberType}`}
            handleCancel={cancelMember}
            handleSave={save}
            handleSaveById={saveById}
            memberType={memberType}
            contextMember={user}
          />
        </div>
      )}
    </div>
  );
}
