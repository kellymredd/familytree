import React from "react";
import { Input, Select, Button, DateInput } from "../controls/index";
import MemberTypeOptions from "./MemberTypes";
import staticLists from "../utils/staticLists";

function ParentChoice({ parent }) {
  return (
    <ul className="parentList">
      <li>
        <input type="radio" name="parentChoice" id="" />
        Father Name and Mother Name (vice/versa based on gender)
      </li>
      <li>
        <input type="radio" name="parentChoice" id="" />
        Father Name and Unknown Mother (vice/versa)
      </li>
    </ul>
  );
}

export default function MemberForm({
  member,
  title,
  handleCancel = () => {},
  handleSave = () => {},
  memberType = null,
  setMember,
}) {
  const onChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function setGender(e) {
    onChange(e);

    const maleArr = ["Father", "Brother", "Husband"];
    const genderValue = maleArr.includes(e.target.value) ? "2" : "1";
    onChange({
      target: {
        name: "gender",
        value: e.target.value ? genderValue : null,
      },
    });
  }

  return (
    <>
      <div className="formWrapper">
        {title && <h3>{title}</h3>}
        <div className="formBody">
          <div className="row">
            {memberType && (
              <div className="col-4">
                <Select
                  id="Type"
                  label="Type"
                  value={member.type}
                  onChange={setGender}
                  options={MemberTypeOptions[`${memberType}`]}
                />
              </div>
            )}
            <div className="col-4">
              <Input
                id="firstName"
                label="First Name"
                value={member.firstName}
                onChange={onChange}
              />
            </div>
            <div className="col-4">
              <Input
                id="middleName"
                label="Middle Name"
                value={member.middleName}
                onChange={onChange}
              />
            </div>
            <div className="col-4">
              <Input
                id="lastName"
                label="Last Name"
                value={member.lastName}
                onChange={onChange}
              />
            </div>
            <div className="col-4">
              {/* this also needs to clear .maidenName form value when changed to Male */}
              <Select
                id="gender"
                label="Gender"
                value={member.gender}
                onChange={onChange}
                selectValueKey="value"
                selectLabelKey="label"
                options={staticLists.gender}
              />
            </div>
            {(member.gender === "1" ||
              member.gender === "1" ||
              member.type === "Wife" ||
              member.type === "Mother") && (
              <div className="col-4">
                <Input
                  id="maidenName"
                  label="Maiden Name"
                  value={member.maidenName}
                  onChange={onChange}
                />
              </div>
            )}
            <div className="col-4">
              <Select
                id="suffix"
                label="Suffix"
                value={member.suffix}
                onChange={onChange}
                selectValueKey="value"
                selectLabelKey="label"
                options={staticLists.suffix}
              />
            </div>
            <div className="col-4">
              <DateInput
                id="dateOfBirth"
                label="Date of Birth"
                value={member.dateOfBirth}
                onChange={onChange}
                placeholder="mm/dd/yyyy"
              />
            </div>
            <div className="col-4">
              <Select
                id="status"
                label="Status"
                value={member.status}
                onChange={onChange}
                selectValueKey="value"
                selectLabelKey="label"
                options={staticLists.status}
              />
            </div>
            {member.status === "Deceased" && (
              <div className="col-4">
                <DateInput
                  id="dateOfDeath"
                  label="Date of Death"
                  value={member.dateOfDeath}
                  onChange={onChange}
                  placeholder="mm/dd/yyyy"
                />
              </div>
            )}
          </div>
          {memberType === "children" ? (
            <>
              <hr />
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="">Parents</label>
                  <ParentChoice parent={member.contextMember} />
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="formFooter">
          <Button btnStyle="link" onClick={handleCancel}>
            Close
          </Button>
          <Button btnStyle="primary" onClick={() => handleSave(member)}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
