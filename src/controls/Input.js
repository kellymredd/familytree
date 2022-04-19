import React from "react";

export default function Input({ label, value, id, onChange, ...props }) {
  return (
    <div className="mb-15">
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        type="text"
        className="form-control form-control-sm"
        name={id}
        {...{ value, id }}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
