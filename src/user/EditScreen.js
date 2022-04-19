import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Template from "../shared/Template";
import MemberForm from "../shared/MemberForm";
import httpUserService from "../hooks/userService";

const initialState = {
  DOB: "",
  DOD: "",
  FamilyId: "",
  FirstName: "",
  Gender: "",
  id: "",
  LastName: "",
  MaidenName: "",
  MiddleName: "",
  Status: "Living",
  Suffix: "",
  Type: ""
};

export default function EditScreen() {
  const [user, setUser] = useState(initialState);
  const history = useHistory();
  const { id } = useParams();
  const { saveUser, getUser } = httpUserService();

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((response) => {
          setUser(response.data());
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const updateFormFields = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const save = () => {
    saveUser(user)
      .then((uid) => {
        if (!id) {
          // go to edit after creating
          history.push(`${uid}/edit`);
        } else {
          history.push(`/${id}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancel = () => {
    history.push(`/${id}`);
  };

  return (
    <Template>
      <Template.Head />
      <Template.Body>
        <MemberForm
          user={user}
          title="Edit Member"
          onChange={updateFormFields}
          handleCancel={cancel}
          handleSave={save}
        />
      </Template.Body>
    </Template>
  );
}
