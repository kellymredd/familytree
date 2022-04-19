import React, { useState, useEffect } from "react";

export default function Select({
  label,
  value,
  id,
  onChange,
  options = [],
  selectValueKey = "name",
  selectLabelKey = "name",
  ...props
}) {
  const [opts, setOpts] = useState([]);

  useEffect(() => {
    Promise.resolve(options).then((response) => setOpts(response));
  }, [options]);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        type="text"
        className="form-control form-select-sm"
        name={id}
        {...{ value, id }}
        onChange={(e) => onChange(e)}
        {...props}
      >
        <option value="">-Select-</option>
        {opts?.map((option, idx) => (
          <option key={idx} value={option[selectValueKey]}>
            {option[selectLabelKey]}
          </option>
        ))}
      </select>
    </>
  );
}
