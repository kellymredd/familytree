import React from "react";
import Header from "../components/Header";
import FamilyMenu from "../components/FamilyMenu";

export default function Template({ children }) {
  return (
    <>
      <FamilyMenu />
      <div className="profile flex">{children}</div>
    </>
  );
}

Template.Head = ({ children }) => {
  return <Header>{children}</Header>;
};

Template.Body = ({ children }) => {
  return <div className="columns">{children}</div>;
};
