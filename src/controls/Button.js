import React from 'react';

// form-control class remove to prevent 100% width
export default function Button({
  children,
  id,
  onClick,
  btnStyle = 'primary',
  type = 'button',
  ...props
}) {
  return (
    <button
      {...props}
      id={id}
      type={type}
      className={`btn-sm btn btn-${btnStyle}`}
      onClick={(e) => onClick(e)}
    >
      {children}
    </button>
  );
}
