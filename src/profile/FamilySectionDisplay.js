import React from "react";
import { Link } from "react-router-dom";

import "./profile.css";

export default function FamilySectionDisplay({ member }) {
  const { firstName, lastName, middleName, id } = member;
  return (
    <div className="displayItem">
      <Link to={`/${id}`}>
        {firstName} {middleName} {lastName}
      </Link>
    </div>
  );
}
