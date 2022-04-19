import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="nav">
      <div className="row">
        <Link to="/">
          <h1>Roots</h1>
        </Link>
      </div>
    </div>
  );
}
