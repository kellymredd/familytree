import React from "react";
import Header from "./Header";

export default function Template({ children }) {
  return <>{children}</>;
}

Template.Head = ({ children }) => {
  return (
    <div className="header">
      <div className="container maxWidth">
        <Header />
        {children}
      </div>
    </div>
  );
};

Template.Body = ({ children }) => {
  return (
    <div className="container maxWidth">
      <div className="row">
        <div className="col">{children}</div>
      </div>
    </div>
  );
};
