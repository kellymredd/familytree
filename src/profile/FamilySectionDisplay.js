import React from "react";
import { Link } from "react-router-dom";

import "./profile.css";

export default function FamilySectionDisplay({ member }) {
  const { FirstName, LastName, MiddleName, id } = member;
  return (
    <div className="displayItem">
      <Link to={`/${id}`}>
        {FirstName} {MiddleName} {LastName}
      </Link>
    </div>
  );
}
