import React from 'react';
import Header from '../components/Header';

export default function Template({ children }) {
  return (
    <>
      <div className="profile flex">{children}</div>
    </>
  );
}

Template.Head = ({ children }) => <Header>{children}</Header>;
Template.Body = ({ children }) => <div className="columns">{children}</div>;
