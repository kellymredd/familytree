import React from "react";
import { Input, Select, Button, DateInput } from "../controls/index";
import MemberTypeOptions from "./MemberTypes";
// import httpUserService from "../hooks/userService";

export default function MemberForm({
  user,
  onChange,
  title,
  handleCancel = () => {},
  handleSave = () => {},
  // handleSaveById,
  memberType = null
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

    const genderValue = e.target.value === "Father" ? "Male" : "Female";
    onChange({
      target: {
        name: "Gender",
        value: e.target.value ? genderValue : ""
      }
    });
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>{title}</h3>
        </div>
        <div className="card-body">
          {/* {!user.id && (
            <>
              <div className="row">
                <div className="col-6">
                  <Select
                    className="form-control"
                    id="ExistingMember"
                    label="Choose Existing Family Member"
                    onChange={selectExisting}
                    selectValueKey="id"
                    selectLabelKey="FirstName"
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
                  value={user.Type}
                  onChange={setGender}
                  options={MemberTypeOptions[`${memberType}`]}
                  // disabled={usingExisting}
                />
              </div>
            )}
            <div className="col-4">
              <Input
                id="FirstName"
                label="First Name"
                value={user.FirstName}
                onChange={onChange}
                // disabled={usingExisting}
                // required={!usingExisting}
              />
            </div>
            <div className="col-4">
              <Input
                id="MiddleName"
                label="Middle Name"
                value={user.MiddleName}
                onChange={onChange}
                // disabled={usingExisting}
              />
            </div>
            <div className="col-4">
              <Input
                id="LastName"
                label="Last Name"
                value={user.LastName}
                onChange={onChange}
                // disabled={usingExisting}
              />
            </div>
            <div className="col-4">
              <Select
                id="Gender"
                label="Gender"
                value={user.Gender}
                onChange={onChange}
                options={[{ name: "Male" }, { name: "Female" }]}
                // disabled={usingExisting}
              />
            </div>
            {(user.Gender === "Female" ||
              user.Type === "Wife" ||
              user.Type === "Mother") && (
              <div className="col-4">
                <Input
                  id="MaidenName"
                  label="Maiden Name"
                  value={user.MaidenName}
                  onChange={onChange}
                  // disabled={usingExisting}
                />
              </div>
            )}
            <div className="col-4">
              <Select
                id="Suffix"
                label="Suffix"
                value={user.Suffix}
                onChange={onChange}
                options={[{ name: "Sr." }, { name: "Jr." }]}
                // disabled={usingExisting}
              />
            </div>
            <div className="col-4">
              <DateInput
                id="DOB"
                label="Date of Birth"
                value={user.DOB}
                onChange={onChange}
                placeholder="mm/dd/yyyy"
                // disabled={usingExisting}
              />
            </div>
            <div className="col-4">
              <Select
                id="Status"
                label="Status"
                value={user.Status}
                onChange={onChange}
                options={[{ name: "Deceased" }, { name: "Living" }]}
                // disabled={usingExisting}
              />
            </div>
            {user.Status === "Deceased" && (
              <div className="col-4">
                <DateInput
                  id="DOD"
                  label="Date of Death"
                  value={user.DOD}
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
              onClick={() => handleSave(user)}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
