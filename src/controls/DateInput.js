import React from 'react';

export default function DateInput({ label, id, onChange, ...props }) {
  return (
    <div className="mb-15 formgroup">
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        type="date"
        className="form-control form-control-sm"
        name={id}
        {...{ id }}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
