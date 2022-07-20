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
  // handleSaveById,
  memberType = null,
}) {
  // const [usingExisting, setUsingExisting] = useState(false);
  // const { userSelectOptions } = httpUserService();

  // function selectExisting(selected) {
  //   const { value } = selected.target;
  //   setUsingExisting(Boolean(value.length));

  //   handleSaveById({ id: value, memberType });
  // }

  function setGender(e) {
    onChange(e);

    const genderValue = e.target.value === "Father" ? 2 : 1;
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
          {/* {!member.id && (
            <>
              <div className="row">
                <div className="col-6">
                  <Select
                    className="form-control"
                    id="ExistingMember"
                    label="Choose Existing Family Member"
                    onChange={selectExisting}
                    selectValueKey="id"
                    selectLabelKey="firstName"
                    options={userSelectOptions()}
                  />
                </div>
              </div>
              <hr />
            </>
          )} */}

          <div className="row">
            {memberType && (
              <div className="col-4">
                <Select
                  id="Type"
                  label="Type"
                  value={member.type}
                  onChange={setGender}
                  options={MemberTypeOptions[`${memberType}`]}
                  // disabled={usingExisting}
                />
              </div>
            )}
            <div className="col-4">
              <Input
                id="firstName"
                label="First Name"
                value={member.firstName}
                onChange={onChange}
                // disabled={usingExisting}
                // required={!usingExisting}
              />
            </div>
            <div className="col-4">
              <Input
                id="middleName"
                label="Middle Name"
                value={member.middleName}
                onChange={onChange}
                // disabled={usingExisting}
              />
            </div>
            <div className="col-4">
              <Input
                id="lastName"
                label="Last Name"
                value={member.lastName}
                onChange={onChange}
                // disabled={usingExisting}
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
                // disabled={usingExisting}
              />
            </div>
            {(member.gender === "Female" ||
              member.type === "Wife" ||
              member.type === "Mother") && (
              <div className="col-4">
                <Input
                  id="maidenName"
                  label="Maiden Name"
                  value={member.maidenName}
                  onChange={onChange}
                  // disabled={usingExisting}
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
                // disabled={usingExisting}
              />
            </div>
            <div className="col-4">
              <DateInput
                id="dateOfBirth"
                label="Date of Birth"
                value={member.dateOfBirth}
                onChange={onChange}
                placeholder="mm/dd/yyyy"
                // disabled={usingExisting}
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
                // disabled={usingExisting}
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
                  // disabled={usingExisting}
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
            <Button
              // disabled={usingExisting}
              btnStyle="primary"
              onClick={() => handleSave(member)}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
