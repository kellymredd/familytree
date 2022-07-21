import React from "react";
import { Input, Select, Button, DateInput } from "../controls/index";
import MemberTypeOptions from "./MemberTypes";
// import httpUserService from "../hooks/userService";

export default function MemberForm({
  member,
  onChange,
  title,
  handleCancel = () => {},
  handleSave = () => {},
  memberType = null,
}) {
  function setGender(e) {
    onChange(e);

    const maleArr = ["Father", "Brother", "Husband"];
    const genderValue = maleArr.includes(e.target.value) ? 2 : 1;
    onChange({
      target: {
        name: "gender",
        value: e.target.value ? genderValue : null,
      },
    });
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>{title}</h3>
        </div>
        <div className="card-body">
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
              <Select
                id="gender"
                label="Gender"
                value={member.gender}
                onChange={onChange}
                selectValueKey="value"
                options={[
                  { name: "Male", value: 2 },
                  { name: "Female", value: 1 },
                ]}
              />
            </div>
            {(member.gender === 1 ||
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
                options={[
                  { name: "Sr.", value: 2 },
                  { name: "Jr.", value: 1 },
                ]}
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
                options={[
                  { name: "Deceased", value: 1 },
                  { name: "Living", value: 2 },
                ]}
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
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-end">
            <Button btnStyle="link" onClick={handleCancel}>
              Close
            </Button>
            <Button btnStyle="primary" onClick={() => handleSave(member)}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
