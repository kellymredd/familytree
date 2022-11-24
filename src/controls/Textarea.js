import React from 'react';

export default function Textarea({ label, value, id, onChange, ...props }) {
  return (
    <div className="mb-15 formgroup">
      <label htmlFor={id}>{label}</label>
      <textarea
        {...props}
        className="form-control form-control-sm"
        name={id}
        {...{ value, id }}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
