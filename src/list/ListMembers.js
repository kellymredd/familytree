import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import Template from "../shared/Template";
import useMembers from "../hooks/useMembers.hook";
import CreateButtonScreenCombo from "../shared/CreateButtonScreenCombo";

export default function ListMembersScreen() {
  const [members, setMembers] = useState(null);
  const { getMembers } = useMembers();

  useEffect(() => {
    getMembers().then((response) => {
      setMembers(response.length ? response : null);
    });
  }, []);

  return (
    <Template>
      <Template.Head>
        <h2>Please select a Family Member</h2>
      </Template.Head>
      <Template.Body></Template.Body>
    </Template>
  );
}
