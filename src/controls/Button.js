import React from "react";

// form-control class remove to prevent 100% width
export default function Button({ children, id, onClick, btnStyle, ...props }) {
  return (
    <button
      {...props}
      id={id}
      type="button"
      className={`btn-sm btn btn-${btnStyle}`}
      onClick={(e) => onClick(e)}
    >
      {children}
    </button>
  );
}
